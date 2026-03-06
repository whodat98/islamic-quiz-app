import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  accessToken?: string;  // Add this to keep token with user
}

interface AuthContextType {
  user: (User & { accessToken: string }) | null;  // Make sure user always has accessToken
  accessToken: string | null;  // Also export separately for backward compatibility
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkPaymentStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      persistSession: true,
      storageKey: 'supabase.auth.token',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Debug log whenever user changes
  useEffect(() => {
    console.log('🔄 AuthContext User State Update:');
    console.log('   User:', user ? `${user.email} (ID: ${user.id})` : 'null');
    console.log('   AccessToken in user:', user?.accessToken ? `${user.accessToken.substring(0, 30)}...` : 'null');
    console.log('   AccessToken wird exportiert als:', user?.accessToken || 'null');
  }, [user]);

  useEffect(() => {
    // Check for existing session
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      console.log('🔍 Überprüfe Session beim App-Start...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('Session gefunden:', !!session);
      console.log('Session Error:', error);
      
      if (session?.access_token) {
        console.log('✅ Session wiederhergestellt - Token vorhanden');
        console.log('   User ID:', session.user.id);
        console.log('   Token Länge:', session.access_token.length);
        
        // Lösche allen Fortschritt bei Session-Wiederherstellung
        console.log('🗑️ Lösche localStorage Fortschritt bei Session-Wiederherstellung');
        localStorage.removeItem('quiz_progress');
        
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          accessToken: session.access_token
        });
      } else {
        console.log('❌ Keine Session gefunden - User bleibt null');
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen der Session:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registrierung fehlgeschlagen');
      }

      // After signup, sign in the user
      // Wait a bit for the user to be fully created in Supabase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        await signIn(email, password);
      } catch (loginError: any) {
        // If login fails, provide helpful message
        console.error('Auto-Login nach Registrierung fehlgeschlagen:', loginError);
        throw new Error('Registrierung erfolgreich! Bitte melden Sie sich jetzt an.');
      }
    } catch (error) {
      console.error('Registrierungsfehler:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Starte Login-Vorgang...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase Auth Fehler:', error);
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Ungültige E-Mail oder Passwort. Bitte überprüfen Sie Ihre Eingaben.');
        }
        throw new Error(error.message || 'Anmeldung fehlgeschlagen');
      }

      console.log('✅ Supabase Auth erfolgreich');
      console.log('   Session vorhanden:', !!data.session);
      console.log('   Access Token vorhanden:', !!data.session?.access_token);
      console.log('   Access Token (erste 30 Zeichen):', data.session?.access_token?.substring(0, 30) + '...');

      if (data.session?.access_token) {
        // Lösche allen Fortschritt bei Login, damit jeder User mit frischem Start beginnt
        console.log('🗑️ Lösche localStorage Fortschritt bei Login - neuer User startet bei 0%');
        localStorage.removeItem('quiz_progress');
        
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || '',
          accessToken: data.session.access_token
        });
        console.log('✅ User und Token im State gesetzt');
      } else {
        throw new Error('Keine Session erhalten. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      console.error('Anmeldefehler:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Abmeldefehler:', error);
      throw error;
    }
  };

  const checkPaymentStatus = async (): Promise<boolean> => {
    if (!user?.accessToken) return false;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/payment-status`,
        {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`,
          },
        }
      );

      const data = await response.json();
      return data.hasPaid || false;
    } catch (error) {
      console.error('Fehler beim Abrufen des Zahlungsstatus:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: user?.accessToken || null,
        loading,
        signUp,
        signIn,
        signOut,
        checkPaymentStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}