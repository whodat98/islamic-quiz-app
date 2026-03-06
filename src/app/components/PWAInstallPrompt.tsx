import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('✅ App läuft bereits als PWA');
      return;
    }

    // Check if user dismissed the prompt before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      
      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    // Listen for the beforeinstallprompt event (Chrome/Edge/Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('💾 beforeinstallprompt Event gefangen');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show the prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show manual instructions
    if (isIOSDevice) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // On iOS, show instructions
      if (isIOS) {
        setShowIOSInstructions(true);
        return;
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('✅ User akzeptierte die Installation');
    } else {
      console.log('❌ User lehnte die Installation ab');
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showPrompt) {
    return null;
  }

  // iOS Instructions
  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full bg-white p-6 relative animate-in slide-in-from-bottom duration-300">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Smartphone className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              App auf dem iPhone installieren
            </h3>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p className="text-gray-700">
                Tippe auf das <strong>"Teilen"</strong> Symbol{' '}
                <span className="inline-block">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="inline text-blue-500">
                    <path d="M10 3.5L10 13M10 3.5L6.5 7M10 3.5L13.5 7M4 13.5L4 15.5C4 16.0523 4.44772 16.5 5 16.5L15 16.5C15.5523 16.5 16 16.0523 16 15.5L16 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </span>{' '}
                unten in Safari
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p className="text-gray-700">
                Scrolle nach unten und wähle{' '}
                <strong>"Zum Home-Bildschirm"</strong>
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p className="text-gray-700">
                Tippe auf <strong>"Hinzufügen"</strong>
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-800">
              ✨ Die App wird wie eine normale App auf deinem Home-Bildschirm erscheinen!
            </p>
          </div>

          <Button
            onClick={handleDismiss}
            className="w-full mt-4"
            variant="outline"
          >
            Verstanden
          </Button>
        </Card>
      </div>
    );
  }

  // Install Prompt (Android/Chrome)
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-md animate-in slide-in-from-bottom duration-300">
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 shadow-2xl border-0">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/80 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              App installieren
            </h3>
            <p className="text-sm text-white/90">
              {isIOS 
                ? 'Installiere die App auf deinem Home-Bildschirm für schnelleren Zugriff!'
                : 'Installiere die App für ein besseres Erlebnis - funktioniert auch offline!'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleInstallClick}
            className="flex-1 bg-white text-emerald-600 hover:bg-white/90 font-bold"
          >
            {isIOS ? 'Anleitung anzeigen' : 'Jetzt installieren'}
          </Button>
          <Button
            onClick={handleDismiss}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            Später
          </Button>
        </div>
      </Card>
    </div>
  );
}
