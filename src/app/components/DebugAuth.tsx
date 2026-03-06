import { useState } from 'react';
import { useAuth, supabase } from '../context/AuthContext';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface DebugAuthProps {
  onPaymentConfirmed?: () => void;
}

export function DebugAuth({ onPaymentConfirmed }: DebugAuthProps) {
  const { user, accessToken } = useAuth();
  const [serverResponse, setServerResponse] = useState<any>(null);
  const [publicDebug, setPublicDebug] = useState<any>(null);
  const [pendingPaymentResult, setPendingPaymentResult] = useState<any>(null);
  const [confirmPaymentResult, setConfirmPaymentResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (e) {
      return null;
    }
  };

  const checkToken = async () => {
    if (!accessToken) return;

    const decoded = decodeJWT(accessToken);
    console.log('Decoded JWT:', decoded);

    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Current session:', session);

    setTokenInfo({
      decoded,
      hasSession: !!session,
      sessionUserId: session?.user?.id,
      tokenExp: decoded?.exp ? new Date(decoded.exp * 1000).toISOString() : null,
      tokenIat: decoded?.iat ? new Date(decoded.iat * 1000).toISOString() : null,
      now: new Date().toISOString()
    });
  };

  const testAuth = async () => {
    console.log('=== DEBUG AUTH TEST ===');
    console.log('Access Token vorhanden:', !!accessToken);
    console.log('Access Token (erste 30):', accessToken?.substring(0, 30) + '...');
    console.log('Token Länge:', accessToken?.length);
    
    if (accessToken) {
      const parts = accessToken.split('.');
      if (parts.length === 3) {
        try {
          const decoded = JSON.parse(atob(parts[1]));
          console.log('Decoded JWT:', decoded);
        } catch (e) {
          console.log('JWT decode error:', e);
        }
      }
    }
    
    const session = await supabase.auth.getSession();
    console.log('Current session:', session);

    try {
      // WICHTIG: Token im BODY senden, nicht im Authorization Header!
      // Supabase Edge Functions validieren den Auth Header automatisch
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/test-auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Verwende publicAnonKey im Auth Header statt user token
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            accessToken: accessToken  // Token im Body!
          })
        }
      );

      const data = await response.json();
      console.log('Test-Antwort:', data);
      
      // Show debugLog if present
      if (data.debugLog && Array.isArray(data.debugLog)) {
        console.log('🔍 SERVER DEBUG LOG:');
        data.debugLog.forEach((log: string) => console.log('   ', log));
      }
      
      setServerResponse({
        status: response.status,
        statusText: response.statusText,
        data: data,
      });
    } catch (error: any) {
      console.error('Test-Fehler:', error);
      setServerResponse({
        status: 0,
        statusText: 'Network Error',
        data: { error: error.message },
      });
    }
  };

  const testPublicDebug = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/public-debug`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );
      const data = await response.json();
      console.log('Public Debug:', data);
      setPublicDebug(data);
    } catch (error: any) {
      console.error('Public Debug Fehler:', error);
      setPublicDebug({ error: error.message });
    }
  };

  const testPendingPayment = async () => {
    if (!accessToken) {
      console.error('Kein Access Token!');
      setPendingPaymentResult({ error: 'Kein Access Token' });
      return;
    }
    
    setLoading(true);
    console.log('🔍 Testing pending payment check...');
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/check-pending-payment`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      const data = await response.json();
      console.log('✅ Pending Payment Response:', data);
      setPendingPaymentResult({ status: response.status, data });
    } catch (error: any) {
      console.error('❌ Pending Payment Error:', error);
      setPendingPaymentResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testConfirmPayment = async () => {
    if (!accessToken) {
      console.error('Kein Access Token!');
      setConfirmPaymentResult({ error: 'Kein Access Token' });
      return;
    }
    
    setLoading(true);
    console.log('🚀 Confirming payment manually...');
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/confirm-payment`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      const data = await response.json();
      console.log('✅ Confirm Payment Response:', data);
      setConfirmPaymentResult({ status: response.status, data });
      
      if (data.hasPaid) {
        alert('🎉 Zahlung erfolgreich bestätigt! Lade die Seite neu, um die Fragen freizuschalten.');
        if (onPaymentConfirmed) {
          onPaymentConfirmed();
        }
      }
    } catch (error: any) {
      console.error('❌ Confirm Payment Error:', error);
      setConfirmPaymentResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testForcePayment = async () => {
    const session = await supabase.auth.getSession();
    const email = session?.data?.session?.user?.email;
    
    if (!email) {
      alert('❌ Keine Email gefunden! Bitte einloggen.');
      return;
    }
    
    setLoading(true);
    console.log('💥 FORCING payment for email:', email);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/test-force-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email })
        }
      );
      const data = await response.json();
      console.log('✅ Force Payment Response:', data);
      setConfirmPaymentResult({ status: response.status, data });
      
      if (data.hasPaid) {
        console.log('🎉🎉🎉 ZAHLUNG ERZWUNGEN! Aktualisiere UI...');
        // Call the callback to update parent state instead of reloading
        if (onPaymentConfirmed) {
          onPaymentConfirmed();
        }
      } else {
        alert(`❌ Fehler: ${data.error || 'Unbekannter Fehler'}`);
      }
    } catch (error: any) {
      console.error('❌ Force Payment Error:', error);
      alert(`❌ Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border-2 border-purple-500 max-w-lg z-50">
      <h3 className="font-bold text-lg mb-2">🔍 Auth Debug</h3>
      
      <div className="mb-3 text-sm">
        <p><strong>Token vorhanden:</strong> {accessToken ? '✅ Ja' : '❌ Nein'}</p>
        {accessToken && (
          <>
            <p><strong>Token (erste 30):</strong> {accessToken.substring(0, 30)}...</p>
            <p><strong>Token Länge:</strong> {accessToken.length}</p>
          </>
        )}
      </div>

      <button
        onClick={testAuth}
        disabled={!accessToken || loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400 w-full mb-2"
      >
        {loading ? 'Teste...' : 'Auth testen'}
      </button>

      {tokenInfo && (
        <div className="mt-3 p-3 bg-blue-50 rounded text-xs overflow-auto max-h-48">
          <p className="font-bold mb-1">Token Info:</p>
          <pre>{JSON.stringify(tokenInfo, null, 2)}</pre>
        </div>
      )}

      {serverResponse && (
        <div className="mt-3 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-96">
          <p className="font-bold mb-1">Server Response:</p>
          <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={testPublicDebug}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
      >
        Public Debug testen
      </button>

      {publicDebug && (
        <div className="mt-3 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-96">
          <p className="font-bold mb-1">Public Debug:</p>
          <pre>{JSON.stringify(publicDebug, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={testPendingPayment}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
      >
        Pending Payment testen
      </button>

      {pendingPaymentResult && (
        <div className="mt-3 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-96">
          <p className="font-bold mb-1">Pending Payment Result:</p>
          <pre>{JSON.stringify(pendingPaymentResult, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={testConfirmPayment}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
      >
        Confirm Payment testen
      </button>

      {confirmPaymentResult && (
        <div className="mt-3 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-96">
          <p className="font-bold mb-1">Confirm Payment Result:</p>
          <pre>{JSON.stringify(confirmPaymentResult, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={testForcePayment}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
      >
        Force Payment testen
      </button>
    </div>
  );
}