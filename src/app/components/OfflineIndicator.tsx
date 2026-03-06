import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { isOnline, registerOnlineListeners } from '../utils/offline';

export function OfflineIndicator() {
  const [online, setOnline] = useState(isOnline());
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Set initial state
    setOnline(navigator.onLine);

    // Register listeners
    const cleanup = registerOnlineListeners(
      () => {
        console.log('✅ App ist wieder online');
        setOnline(true);
        setShowBanner(true);
        
        // Hide banner after 3 seconds
        setTimeout(() => setShowBanner(false), 3000);
      },
      () => {
        console.log('⚠️ App ist offline');
        setOnline(false);
        setShowBanner(true);
      }
    );

    return cleanup;
  }, []);

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      {online ? (
        <div className="bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Wieder online</span>
        </div>
      ) : (
        <div className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">Offline-Modus</span>
        </div>
      )}
    </div>
  );
}
