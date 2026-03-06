import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Check, Trophy, Target, Users, Lock, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function PaymentPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { accessToken, checkPaymentStatus } = useAuth();

  useEffect(() => {
    // Check if user already paid
    const checkStatus = async () => {
      const hasPaid = await checkPaymentStatus();
      if (hasPaid) {
        navigate('/dashboard');
      }
    };
    checkStatus();
  }, []);

  const handlePayment = async () => {
    if (!accessToken) {
      console.error('❌ Kein Access Token vorhanden - Weiterleitung zu Login');
      navigate('/login');
      return;
    }

    console.log('✅ Access Token vorhanden:', accessToken ? `${accessToken.substring(0, 30)}...` : 'NULL');
    console.log('   Token Länge:', accessToken?.length);

    setIsProcessing(true);
    setError('');

    try {
      console.log('Starte Zahlungsprozess...');
      
      // WICHTIG: Sende publicAnonKey im Authorization Header
      // und userToken im X-User-Token Header, um Supabase Edge Function
      // Middleware zu umgehen
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
            'X-User-Token': accessToken,
          },
        }
      );

      const data = await response.json();
      console.log('Server-Antwort:', data);
      console.log('Server-Antwort (JSON):', JSON.stringify(data, null, 2));
      console.log('🔍 DEBUG: Stripe Session ID:', data.sessionId);
      console.log('🔍 DEBUG: Stripe Checkout URL:', data.url);

      if (!response.ok) {
        console.error('Fehler-Antwort vom Server:', data);
        console.error('Fehler-Antwort (JSON):', JSON.stringify(data, null, 2));
        
        // Show detailed error if available
        if (data.details) {
          console.error('Fehler-Details:', JSON.stringify(data.details, null, 2));
          const details = data.details;
          throw new Error(`${data.error || 'Fehler beim Erstellen der Zahlung'}\\n\\nDetails:\\n${JSON.stringify(details, null, 2)}`);
        }
        
        throw new Error(data.error || 'Fehler beim Erstellen der Zahlung');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        console.log('Weiterleitung zu Stripe:', data.url);
        // Use window.top to break out of iframe (required for Figma Make environment)
        if (window.top) {
          window.top.location.href = data.url;
        } else {
          window.location.href = data.url;
        }
      } else {
        throw new Error('Keine Checkout-URL erhalten');
      }
    } catch (err: any) {
      console.error('Zahlungsfehler:', err);
      
      // Provide more specific error messages
      let errorMessage = 'Zahlung fehlgeschlagen. ';
      
      if (err.message?.includes('Stripe ist nicht konfiguriert')) {
        errorMessage += 'Die Zahlungsintegration ist noch nicht vollständig eingerichtet. Bitte kontaktiere den Support.';
      } else if (err.message?.includes('Nicht autorisiert')) {
        errorMessage += 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.';
        setTimeout(() => navigate('/login'), 2000);
      } else {
        errorMessage += err.message || 'Bitte versuchen Sie es erneut.';
      }
      
      setError(errorMessage);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Islamisches Wissens-Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Teste und erweitere dein Wissen über den Islam
          </p>
        </div>

        <Card className="p-8 shadow-2xl">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Linke Seite - Features */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Was dich erwartet:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">300 anspruchsvolle Fragen</h3>
                    <p className="text-sm text-gray-600">
                      Umfassende Fragen zu Quran, Hadith, Fiqh, Seerah, Geschichte und Aqidah
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">6 Kategorien</h3>
                    <p className="text-sm text-gray-600">
                      Spezialisierte Themenbereiche für gezieltes Lernen
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Fortschrittsverfolgung</h3>
                    <p className="text-sm text-gray-600">
                      Verfolge deine Leistung und sieh deine Verbesserungen
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Detaillierte Erklärungen</h3>
                    <p className="text-sm text-gray-600">
                      Lerne aus deinen Antworten mit ausführlichen Erläuterungen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechte Seite - Preis & Zahlung */}
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center shadow-lg">
                <div className="mb-4">
                  <p className="text-sm opacity-90 mb-2">Einmaliger Zugang</p>
                  <div className="text-5xl font-bold mb-1">4,99€</div>
                  <p className="text-sm opacity-90">Lebenslanger Zugriff</p>
                </div>
                
                <div className="bg-white/20 rounded-lg p-4 mb-6">
                  <p className="text-sm mb-2">✓ Alle 300 Fragen freigeschaltet</p>
                  <p className="text-sm mb-2">✓ Unbegrenzter Zugriff</p>
                  <p className="text-sm">✓ Sofortiger Start</p>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-white text-emerald-600 hover:bg-gray-100 text-lg py-6 font-semibold"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Weiterleitung zu Stripe...
                    </>
                  ) : (
                    'Jetzt freischalten'
                  )}
                </Button>
                
                <p className="text-xs mt-4 opacity-75">
                  Sichere Zahlung über Stripe
                </p>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>🔒 Sichere Zahlung • 💳 Alle gängigen Zahlungsmethoden</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Entwickelt für Muslime, die ihr Wissen vertiefen möchten
          </p>
        </div>
      </div>
    </div>
  );
}