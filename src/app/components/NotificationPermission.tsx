import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Bell, BellOff, X } from 'lucide-react';
import {
  areNotificationsSupported,
  getNotificationPermission,
  requestNotificationPermission,
} from '../utils/notifications';

export function NotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    setIsSupported(areNotificationsSupported());
    
    if (!areNotificationsSupported()) {
      return;
    }

    // Get current permission
    setPermission(getNotificationPermission());

    // Check if user dismissed prompt before
    const dismissed = localStorage.getItem('notification-prompt-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      
      // Show again after 30 days
      if (daysSinceDismissed < 30) {
        return;
      }
    }

    // Show prompt after 10 seconds if permission is default
    if (getNotificationPermission() === 'default') {
      setTimeout(() => {
        setShowPrompt(true);
      }, 10000);
    }
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    
    if (granted) {
      setPermission('granted');
      setShowPrompt(false);
      
      // Show success message
      console.log('✅ Benachrichtigungen aktiviert!');
    } else {
      setPermission('denied');
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('notification-prompt-dismissed', Date.now().toString());
  };

  // Don't show if not supported or permission already decided
  if (!isSupported || permission !== 'default' || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-md animate-in slide-in-from-bottom duration-300">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-2xl border-0">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/80 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              Benachrichtigungen aktivieren?
            </h3>
            <p className="text-sm text-white/90">
              Erhalte Erinnerungen für tägliche Quizze und lerne regelmäßig!
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-3 text-sm text-white/90">
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span>Tägliche Quiz-Erinnerungen</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span>Streak-Benachrichtigungen</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏆</span>
            <span>Achievement-Updates</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleEnableNotifications}
            className="flex-1 bg-white text-blue-600 hover:bg-white/90 font-bold"
          >
            Aktivieren
          </Button>
          <Button
            onClick={handleDismiss}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            Nicht jetzt
          </Button>
        </div>
      </Card>
    </div>
  );
}
