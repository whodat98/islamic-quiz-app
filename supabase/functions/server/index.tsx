import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase configuration
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || '';
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

// Initialize Stripe with environment variable
const stripe = new Stripe(STRIPE_SECRET_KEY);

// Initialize Supabase admin client with service role
const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
);

// Initialize Supabase auth client with ANON key for validating user tokens
const supabaseAuth = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

// Helper function to get authenticated user from access token
async function getAuthenticatedUser(accessToken: string) {
  if (!accessToken) {
    console.log('[AUTH] No access token provided');
    return { user: null, error: 'Kein Access Token' };
  }

  console.log('[AUTH] Validating token...');
  console.log('[AUTH] Token length:', accessToken.length);
  console.log('[AUTH] Token starts with:', accessToken.substring(0, 20) + '...');
  console.log('[AUTH] SUPABASE_URL:', SUPABASE_URL);
  console.log('[AUTH] ANON_KEY length:', SUPABASE_ANON_KEY.length);

  try {
    // Method 1: Create client with token in options (recommended)
    const supabaseWithToken = createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      }
    );
    
    console.log('[AUTH] Calling getUser() with token in headers...');
    const { data: { user }, error } = await supabaseWithToken.auth.getUser();
    
    if (error) {
      console.log('[AUTH] getUser error:', error.message);
      console.log('[AUTH] Error details:', JSON.stringify(error));
      
      // Try Method 2: Pass token directly to getUser
      console.log('[AUTH] Trying alternative method with token parameter...');
      const supabaseAlt = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data: { user: user2 }, error: error2 } = await supabaseAlt.auth.getUser(accessToken);
      
      if (error2) {
        console.log('[AUTH] Alternative method also failed:', error2.message);
        return { user: null, error: error2.message };
      }
      
      if (user2) {
        console.log('[AUTH] Alternative method succeeded! User ID:', user2.id);
        return { user: user2, error: null };
      }
      
      return { user: null, error: error.message };
    }
    
    if (!user) {
      console.log('[AUTH] No user found for token');
      return { user: null, error: 'User not found' };
    }
    
    console.log('[AUTH] Success! User ID:', user.id);
    return { user, error: null };
  } catch (err: any) {
    console.log('[AUTH] Exception in getAuthenticatedUser:', err.message);
    console.log('[AUTH] Stack:', err.stack);
    return { user: null, error: err.message };
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-User-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-87b5103a/health", (c) => {
  return c.json({ status: "ok" });
});

// Public debug endpoint - no auth required
app.all("/make-server-87b5103a/public-debug", async (c) => {
  console.log('[PUBLIC DEBUG] Endpoint called');
  console.log('[PUBLIC DEBUG] Method:', c.req.method);
  console.log('[PUBLIC DEBUG] Headers:', Object.fromEntries(c.req.raw.headers));
  
  return c.json({
    timestamp: new Date().toISOString(),
    supabaseUrl: SUPABASE_URL,
    hasAnonKey: !!SUPABASE_ANON_KEY,
    anonKeyPreview: SUPABASE_ANON_KEY?.substring(0, 30) + '...',
    anonKeyLength: SUPABASE_ANON_KEY?.length,
    hasServiceRoleKey: !!SUPABASE_SERVICE_ROLE_KEY,
    serviceRoleKeyPreview: SUPABASE_SERVICE_ROLE_KEY?.substring(0, 30) + '...',
    hasStripeKey: !!STRIPE_SECRET_KEY,
    hasStripeWebhook: !!STRIPE_WEBHOOK_SECRET,
  });
});

// Test auth endpoint - for debugging only
app.post("/make-server-87b5103a/test-auth", async (c) => {
  const debugLog: string[] = [];
  
  try {
    // Token kann aus Header ODER Body kommen
    const authHeader = c.req.header('Authorization')?.split(' ')[1];
    const body = await c.req.json();
    const accessToken = body?.accessToken || authHeader;
    
    debugLog.push('=== SERVER TEST AUTH DEBUG ===');
    debugLog.push(`Has accessToken from body: ${!!body?.accessToken}`);
    debugLog.push(`Has accessToken from header: ${!!authHeader}`);
    debugLog.push(`Using token from: ${body?.accessToken ? 'BODY' : 'HEADER'}`);
    
    if (!accessToken) {
      debugLog.push('ERROR: Kein Token');
      return c.json({ error: 'Kein Token', debugLog }, 400);
    }

    debugLog.push(`Token length: ${accessToken.length}`);
    debugLog.push(`Token preview: ${accessToken.substring(0, 30)}...`);
    debugLog.push(`SUPABASE_URL: ${SUPABASE_URL}`);
    debugLog.push(`SUPABASE_ANON_KEY exists: ${!!SUPABASE_ANON_KEY}`);
    debugLog.push(`SUPABASE_ANON_KEY length: ${SUPABASE_ANON_KEY?.length || 0}`);
    debugLog.push(`SUPABASE_ANON_KEY preview: ${SUPABASE_ANON_KEY?.substring(0, 30)}...`);

    // Test with ANON client
    debugLog.push('--- Testing with supabaseAuth (ANON key) ---');
    const { data: authData, error: authError } = await supabaseAuth.auth.getUser(accessToken);
    debugLog.push(`Auth hasUser: ${!!authData?.user}`);
    debugLog.push(`Auth userId: ${authData?.user?.id || 'null'}`);
    debugLog.push(`Auth error: ${authError?.message || 'null'}`);
    if (authError) {
      debugLog.push(`Auth error full: ${JSON.stringify(authError)}`);
    }

    // Also test with admin client for comparison
    debugLog.push('--- Testing with supabaseAdmin (SERVICE_ROLE key) ---');
    const { data: adminData, error: adminError } = await supabaseAdmin.auth.getUser(accessToken);
    debugLog.push(`Admin hasUser: ${!!adminData?.user}`);
    debugLog.push(`Admin userId: ${adminData?.user?.id || 'null'}`);
    debugLog.push(`Admin error: ${adminError?.message || 'null'}`);
    if (adminError) {
      debugLog.push(`Admin error full: ${JSON.stringify(adminError)}`);
    }

    debugLog.push('--- Testing with getAuthenticatedUser() function ---');
    const { user, error } = await getAuthenticatedUser(accessToken);
    debugLog.push(`getAuthenticatedUser hasUser: ${!!user}`);
    debugLog.push(`getAuthenticatedUser userId: ${user?.id || 'null'}`);
    debugLog.push(`getAuthenticatedUser error: ${error || 'null'}`);
    
    return c.json({
      success: !!user,
      user: user ? { id: user.id, email: user.email } : null,
      error: error || null,
      authClientTest: {
        success: !!authData?.user,
        error: authError?.message
      },
      adminClientTest: {
        success: !!adminData?.user,
        error: adminError?.message
      },
      debugLog
    });
  } catch (err: any) {
    debugLog.push(`EXCEPTION: ${err.message}`);
    debugLog.push(`STACK: ${err.stack}`);
    return c.json({ error: err.message, stack: err.stack, debugLog }, 500);
  }
});

// User signup endpoint
app.post("/make-server-87b5103a/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, Passwort und Name sind erforderlich' }, 400);
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
    const userExists = existingUser?.users?.some(u => u.email === email);
    
    if (userExists) {
      return c.json({ error: 'Ein Benutzer mit dieser E-Mail existiert bereits' }, 400);
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Fehler bei Benutzerregistrierung: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    if (!data.user) {
      return c.json({ error: 'Benutzer konnte nicht erstellt werden' }, 500);
    }

    // Initialize user data in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,  // WICHTIG: id speichern für Force Payment lookup!
      email,
      name,
      hasPaid: false,
      createdAt: new Date().toISOString(),
    });

    return c.json({ 
      message: 'Registrierung erfolgreich',
      user: { id: data.user.id, email, name }
    });
  } catch (error) {
    console.log(`Server-Fehler bei Registrierung: ${error}`);
    return c.json({ error: 'Serverfehler bei Registrierung' }, 500);
  }
});

// Create Stripe Checkout Session
app.post("/make-server-87b5103a/create-checkout-session", async (c) => {
  try {
    console.log('=== CREATE CHECKOUT SESSION STARTED ===');
    
    // Read token from custom header instead of Authorization header
    // to avoid Supabase Edge Function middleware blocking it
    const accessToken = c.req.header('X-User-Token');
    
    console.log('X-User-Token Header:', accessToken ? `${accessToken.substring(0, 30)}...` : 'MISSING');
    
    if (!accessToken) {
      console.log('❌ Fehler: Kein Access Token vorhanden');
      return c.json({ error: 'Nicht autorisiert - kein Token' }, 401);
    }

    console.log(`✓ Access Token gefunden (erste 30 Zeichen): ${accessToken.substring(0, 30)}...`);
    console.log(`✓ Token Länge: ${accessToken.length}`);
    console.log(`✓ SUPABASE_SERVICE_ROLE_KEY vorhanden: ${!!SUPABASE_SERVICE_ROLE_KEY}`);

    console.log('Validiere Benutzer mit Access Token...');

    // Validate user with the correct helper function
    const { user, error: authError } = await getAuthenticatedUser(accessToken);
    
    if (authError) {
      console.log(`❌ Auth-Fehler aufgetreten: ${authError}`)      
      // Return detailed error for debugging
      return c.json({ 
        error: `Authentifizierung fehlgeschlagen: ${authError}`,
        details: {
          errorMessage: authError,
          tokenPreview: accessToken.substring(0, 30) + '...',
          tokenLength: accessToken.length,
          supabaseUrlSet: !!SUPABASE_URL,
          anonKeySet: !!SUPABASE_ANON_KEY,
        }
      }, 401);
    }

    if (!user?.id) {
      console.log('❌ Fehler: Kein Benutzer gefunden (user ist null oder hat keine ID)');
      return c.json({ error: 'Benutzer nicht gefunden' }, 401);
    }

    console.log(`✅ Benutzer erfolgreich validiert: ${user.id} (${user.email})`);
    console.log(`Erstelle Checkout-Session für Benutzer: ${user.id}`);

    // Check if user already paid
    const userData = await kv.get(`user:${user.id}`);
    if (userData?.hasPaid) {
      console.log('Benutzer hat bereits bezahlt');
      return c.json({ error: 'Sie haben bereits bezahlt' }, 400);
    }

    // Set a pending payment flag so we can detect when user returns from Stripe
    // This is more reliable than URL parameters which can be lost
    await kv.set(`pendingPayment:${user.id}`, {
      userId: user.id,
      timestamp: new Date().toISOString(),
      email: user.email
    });
    console.log(`✅ Pending payment flag set for user ${user.id}`);

    // Check if Stripe is properly configured
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey || stripeKey === '') {
      console.log('FEHLER: STRIPE_SECRET_KEY nicht konfiguriert!');
      return c.json({ error: 'Stripe ist nicht konfiguriert. Bitte STRIPE_SECRET_KEY in den Secrets hinzufügen.' }, 500);
    }

    // Get the origin for redirect URLs
    const origin = c.req.header('origin') || c.req.header('referer')?.replace(/\/$/, '') || 'http://localhost:5173';
    console.log(`Origin für Redirects: ${origin}`);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Islamisches Quiz - Premium Zugang',
              description: '200 schwere Fragen in 6 Kategorien',
            },
            unit_amount: 499, // 4.99 EUR in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/dashboard?payment=success`,
      cancel_url: `${origin}/payment?payment=cancelled`,
      client_reference_id: user.id,
      customer_email: user.email,
    });

    console.log(`Checkout-Session erstellt: ${session.id}`);
    return c.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.log(`FEHLER beim Erstellen der Checkout-Session: ${error.message || error}`);
    console.log(`Error Stack: ${error.stack}`);
    return c.json({ error: `Fehler beim Erstellen der Checkout-Session: ${error.message}` }, 500);
  }
});

// Stripe Webhook endpoint
app.post("/make-server-87b5103a/stripe-webhook", async (c) => {
  try {
    const signature = c.req.header('stripe-signature');
    const body = await c.req.text();

    if (!signature) {
      return c.json({ error: 'Keine Signatur' }, 400);
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.log('STRIPE_WEBHOOK_SECRET nicht konfiguriert');
      return c.json({ error: 'Webhook-Secret fehlt' }, 500);
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;

      if (userId) {
        // Update user payment status
        const userData = await kv.get(`user:${userId}`);
        if (userData) {
          await kv.set(`user:${userId}`, {
            ...userData,
            hasPaid: true,
            paidAt: new Date().toISOString(),
            stripeSessionId: session.id,
          });
          console.log(`Zahlung erfolgreich für Benutzer ${userId}`);
        }
      }
    }

    return c.json({ received: true });
  } catch (error) {
    console.log(`Webhook-Fehler: ${error}`);
    return c.json({ error: 'Webhook-Fehler' }, 400);
  }
});

// Check payment status
app.get("/make-server-87b5103a/payment-status", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    // Validate the access token using the service role client
    const { user, error: authError } = await getAuthenticatedUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Payment-Status Auth-Fehler: ${authError?.message}`);
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    return c.json({ 
      hasPaid: userData?.hasPaid || false,
      paidAt: userData?.paidAt || null
    });
  } catch (error) {
    console.log(`Fehler beim Abrufen des Zahlungsstatus: ${error}`);
    return c.json({ error: 'Fehler beim Abrufen des Zahlungsstatus' }, 500);
  }
});

// Confirm payment after Stripe success redirect (fallback for test mode)
app.post("/make-server-87b5103a/confirm-payment", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    // Validate the access token
    const { user, error: authError } = await getAuthenticatedUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Confirm Payment Auth-Fehler: ${authError}`);
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    console.log(`[CONFIRM PAYMENT] User ${user.id} confirming payment after Stripe success redirect`);

    // Get current user data
    const userData = await kv.get(`user:${user.id}`);
    
    if (!userData) {
      console.log(`[CONFIRM PAYMENT] User data not found for ${user.id}`);
      return c.json({ error: 'Benutzerdaten nicht gefunden' }, 404);
    }

    // If already paid, just return success
    if (userData.hasPaid) {
      console.log(`[CONFIRM PAYMENT] User ${user.id} already has hasPaid=true`);
      // Delete pending payment flag since payment is confirmed
      await kv.del(`pendingPayment:${user.id}`);
      return c.json({ 
        success: true, 
        message: 'Zahlung bereits bestätigt',
        hasPaid: true 
      });
    }

    // Set payment status to true (fallback for test mode where webhooks don't work)
    await kv.set(`user:${user.id}`, {
      ...userData,
      hasPaid: true,
      paidAt: new Date().toISOString(),
      confirmedViaRedirect: true, // Mark that this was confirmed via redirect, not webhook
    });

    // Delete pending payment flag since payment is now confirmed
    await kv.del(`pendingPayment:${user.id}`);

    console.log(`[CONFIRM PAYMENT] ✅ Payment confirmed for user ${user.id}`);

    return c.json({ 
      success: true,
      message: 'Zahlung erfolgreich bestätigt',
      hasPaid: true
    });
  } catch (error: any) {
    console.log(`[CONFIRM PAYMENT] Fehler: ${error.message}`);
    return c.json({ error: 'Fehler beim Bestätigen der Zahlung' }, 500);
  }
});

// Check if user has a pending payment (just returned from Stripe)
app.get("/make-server-87b5103a/check-pending-payment", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    // Validate the access token
    const { user, error: authError } = await getAuthenticatedUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Check Pending Payment Auth-Fehler: ${authError}`);
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    console.log(`[CHECK PENDING] Checking for pending payment for user ${user.id}`);

    // Check for pending payment flag
    const pendingPayment = await kv.get(`pendingPayment:${user.id}`);
    
    if (pendingPayment) {
      console.log(`[CHECK PENDING] ✅ Found pending payment for user ${user.id}`);
      console.log(`[CHECK PENDING] Timestamp: ${pendingPayment.timestamp}`);
      
      // Check if pending payment is not too old (max 15 minutes)
      const timestamp = new Date(pendingPayment.timestamp);
      const now = new Date();
      const ageMinutes = (now.getTime() - timestamp.getTime()) / (1000 * 60);
      
      console.log(`[CHECK PENDING] Pending payment age: ${ageMinutes.toFixed(1)} minutes`);
      
      if (ageMinutes > 15) {
        console.log(`[CHECK PENDING] ⚠️ Pending payment too old (${ageMinutes.toFixed(1)} min) - deleting`);
        await kv.del(`pendingPayment:${user.id}`);
        return c.json({ hasPendingPayment: false });
      }
      
      return c.json({ 
        hasPendingPayment: true,
        timestamp: pendingPayment.timestamp,
        ageMinutes: ageMinutes.toFixed(1)
      });
    }

    console.log(`[CHECK PENDING] No pending payment found for user ${user.id}`);
    return c.json({ hasPendingPayment: false });
  } catch (error: any) {
    console.log(`[CHECK PENDING] Fehler: ${error.message}`);
    return c.json({ error: 'Fehler beim Prüfen des Zahlungsstatus' }, 500);
  }
});

// Get user progress
app.get("/make-server-87b5103a/progress", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    // Validate the access token using the service role client
    const { user, error: authError } = await getAuthenticatedUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Progress Get Auth-Fehler: ${authError?.message}`);
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    // Load progress from KV store
    const progress = await kv.get(`progress:${user.id}`);
    
    if (!progress) {
      // Return empty progress if none exists
      return c.json({ 
        progress: {
          answeredQuestions: {},
          categoryProgress: {},
          totalScore: 0
        }
      });
    }

    return c.json({ progress });
  } catch (error) {
    console.log(`Fehler beim Laden des Fortschritts: ${error}`);
    return c.json({ error: 'Fehler beim Laden des Fortschritts' }, 500);
  }
});

// Save user progress
app.post("/make-server-87b5103a/progress", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    // Validate the access token using the service role client
    const { user, error: authError } = await getAuthenticatedUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Progress Post Auth-Fehler: ${authError?.message}`);
      return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    // 🎉 KEINE ZAHLUNGSPRÜFUNG MEHR - Alle User können ihren Fortschritt speichern!
    // Check if user has paid
    // const userData = await kv.get(`user:${user.id}`);
    // if (!userData?.hasPaid) {
    //   return c.json({ error: 'Zahlung erforderlich' }, 403);
    // }

    const { progress } = await c.req.json();
    
    // Load existing progress to merge with new data
    const existingProgress = await kv.get(`progress:${user.id}`) || {
      answeredQuestions: {},
      categoryProgress: {},
      totalScore: 0
    };

    // Merge answeredQuestions (combine old and new)
    const mergedAnsweredQuestions = {
      ...existingProgress.answeredQuestions,
      ...progress.answeredQuestions
    };

    // Merge categoryProgress (combine old and new)
    const mergedCategoryProgress = {
      ...existingProgress.categoryProgress,
      ...progress.categoryProgress
    };

    // Update total score (use the higher value)
    const mergedTotalScore = Math.max(
      existingProgress.totalScore || 0,
      progress.totalScore || 0
    );

    const mergedProgress = {
      answeredQuestions: mergedAnsweredQuestions,
      categoryProgress: mergedCategoryProgress,
      totalScore: mergedTotalScore
    };

    await kv.set(`progress:${user.id}`, mergedProgress);

    console.log(`✅ Fortschritt gespeichert für User ${user.id}: ${Object.keys(mergedAnsweredQuestions).length} Fragen beantwortet`);

    return c.json({ message: 'Fortschritt gespeichert', progress: mergedProgress });
  } catch (error) {
    console.log(`Fehler beim Speichern des Fortschritts: ${error}`);
    return c.json({ error: 'Fehler beim Speichern des Fortschritts' }, 500);
  }
});

// Analytics endpoint - Track events
app.post("/make-server-87b5103a/analytics", async (c) => {
  try {
    const eventData = await c.req.json();
    const { event, timestamp, sessionId, data } = eventData;

    if (!event || !timestamp) {
      return c.json({ error: 'Event und Timestamp erforderlich' }, 400);
    }

    // Store analytics event with compound key: timestamp + event + sessionId
    const analyticsKey = `analytics:${timestamp}:${event}:${sessionId || 'anon'}`;
    
    await kv.set(analyticsKey, {
      event,
      timestamp,
      sessionId,
      data,
      storedAt: new Date().toISOString(),
    });

    // Also increment counters for easy aggregation
    const dateKey = new Date(timestamp).toISOString().split('T')[0]; // YYYY-MM-DD
    const counterKey = `analytics:counter:${dateKey}:${event}`;
    
    const currentCount = await kv.get(counterKey);
    await kv.set(counterKey, (currentCount || 0) + 1);

    return c.json({ success: true });
  } catch (error) {
    console.log(`Analytics-Fehler: ${error}`);
    return c.json({ error: 'Fehler beim Speichern der Analytics' }, 500);
  }
});

// Get analytics stats
app.get("/make-server-87b5103a/analytics/stats", async (c) => {
  try {
    // Get all analytics counters
    const counters = await kv.getByPrefix('analytics:counter:');
    
    // Aggregate stats
    const stats: Record<string, any> = {
      totalEvents: 0,
      eventTypes: {},
      dailyStats: {},
    };

    counters.forEach((counter: any) => {
      const count = counter || 0;
      stats.totalEvents += count;

      // Parse key: analytics:counter:YYYY-MM-DD:event_name
      const keyParts = Object.keys(counter)[0]?.split(':');
      if (keyParts && keyParts.length >= 4) {
        const date = keyParts[2];
        const eventType = keyParts.slice(3).join(':');

        if (!stats.eventTypes[eventType]) {
          stats.eventTypes[eventType] = 0;
        }
        stats.eventTypes[eventType] += count;

        if (!stats.dailyStats[date]) {
          stats.dailyStats[date] = {};
        }
        stats.dailyStats[date][eventType] = count;
      }
    });

    return c.json(stats);
  } catch (error) {
    console.log(`Fehler beim Abrufen der Analytics-Stats: ${error}`);
    return c.json({ error: 'Fehler beim Abrufen der Stats' }, 500);
  }
});

// ==================== DUELL ROUTES ====================

// Create a new duell
app.post("/make-server-87b5103a/duell/create", async (c) => {
  try {
    const { duell } = await c.req.json();
    
    if (!duell || !duell.id) {
      return c.json({ error: 'Invalid duell data' }, 400);
    }

    console.log('Creating duell:', duell.id);
    
    // Store duell in KV store
    await kv.set(`duell:${duell.id}`, duell);
    
    return c.json({ success: true, duellId: duell.id });
  } catch (error) {
    console.error('Error creating duell:', error);
    return c.json({ error: 'Failed to create duell' }, 500);
  }
});

// Join an existing duell
app.post("/make-server-87b5103a/duell/join", async (c) => {
  try {
    const { duellId, player } = await c.req.json();
    
    if (!duellId || !player) {
      return c.json({ error: 'Missing duellId or player data' }, 400);
    }

    console.log('Player joining duell:', duellId);
    
    // Get existing duell
    const duell = await kv.get(`duell:${duellId}`);
    
    if (!duell) {
      return c.json({ error: 'Duell not found' }, 404);
    }

    // Check if duell is full
    if (duell.player2) {
      return c.json({ error: 'Duell is full' }, 400);
    }

    // Add player 2
    duell.player2 = player;
    duell.status = 'active';
    
    // Update duell
    await kv.set(`duell:${duellId}`, duell);
    
    return c.json({ success: true, duell });
  } catch (error) {
    console.error('Error joining duell:', error);
    return c.json({ error: 'Failed to join duell' }, 500);
  }
});

// Get duell data
app.get("/make-server-87b5103a/duell/:duellId", async (c) => {
  try {
    const duellId = c.req.param('duellId');
    
    if (!duellId) {
      return c.json({ error: 'Missing duellId' }, 400);
    }

    const duell = await kv.get(`duell:${duellId}`);
    
    if (!duell) {
      return c.json({ error: 'Duell not found' }, 404);
    }

    return c.json({ success: true, duell });
  } catch (error) {
    console.error('Error getting duell:', error);
    return c.json({ error: 'Failed to get duell' }, 500);
  }
});

// Submit an answer
app.post("/make-server-87b5103a/duell/answer", async (c) => {
  try {
    const { duellId, profileId, questionId, answer, correct } = await c.req.json();
    
    if (!duellId || !profileId || questionId === undefined) {
      return c.json({ error: 'Missing required data' }, 400);
    }

    // Get duell
    const duell = await kv.get(`duell:${duellId}`);
    
    if (!duell) {
      return c.json({ error: 'Duell not found' }, 404);
    }

    // Determine which player
    const isPlayer1 = duell.player1.profileId === profileId;
    const player = isPlayer1 ? duell.player1 : duell.player2;

    if (!player) {
      return c.json({ error: 'Player not found' }, 404);
    }

    // Add answer
    const answerData = {
      questionId,
      answer,
      correct,
    };

    player.answers.push(answerData);
    
    // Update score
    if (correct) {
      player.score = (player.score || 0) + 1;
    }

    // Update duell
    if (isPlayer1) {
      duell.player1 = player;
    } else {
      duell.player2 = player;
    }

    await kv.set(`duell:${duellId}`, duell);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return c.json({ error: 'Failed to submit answer' }, 500);
  }
});

// Finish duell (determine winner)
app.post("/make-server-87b5103a/duell/finish", async (c) => {
  try {
    const { duellId } = await c.req.json();
    
    if (!duellId) {
      return c.json({ error: 'Missing duellId' }, 400);
    }

    // Get duell
    const duell = await kv.get(`duell:${duellId}`);
    
    if (!duell) {
      return c.json({ error: 'Duell not found' }, 404);
    }

    // Determine winner
    const player1Score = duell.player1.score || 0;
    const player2Score = duell.player2?.score || 0;

    if (player1Score > player2Score) {
      duell.winner = duell.player1.profileId;
    } else if (player2Score > player1Score) {
      duell.winner = duell.player2.profileId;
    } else {
      duell.winner = 'draw';
    }

    duell.status = 'finished';
    
    await kv.set(`duell:${duellId}`, duell);
    
    return c.json({ success: true, winner: duell.winner });
  } catch (error) {
    console.error('Error finishing duell:', error);
    return c.json({ error: 'Failed to finish duell' }, 500);
  }
});

Deno.serve(app.fetch);