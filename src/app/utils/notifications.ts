/**
 * Push Notifications Utility
 * Handles push notification subscription and display
 */

import { projectId, publicAnonKey } from '/utils/supabase/info';

const NOTIFICATIONS_ENDPOINT = `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/notifications`;

// Check if notifications are supported
export function areNotificationsSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

// Check current permission status
export function getNotificationPermission(): NotificationPermission {
  if (!areNotificationsSupported()) {
    return 'denied';
  }
  return Notification.permission;
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!areNotificationsSupported()) {
    console.log('❌ Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    console.log('✅ Notification permission already granted');
    return true;
  }

  if (Notification.permission === 'denied') {
    console.log('❌ Notification permission denied');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    console.log(`📱 Notification permission: ${permission}`);
    
    if (permission === 'granted') {
      // Subscribe to push notifications
      await subscribeToPushNotifications();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Error requesting notification permission:', error);
    return false;
  }
}

// Subscribe to push notifications
async function subscribeToPushNotifications(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Check if already subscribed
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      console.log('✅ Already subscribed to push notifications');
      return;
    }

    // Subscribe
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(getVapidPublicKey()),
    });

    console.log('✅ Subscribed to push notifications');
    console.log('Subscription:', JSON.stringify(subscription));

    // Send subscription to backend
    await sendSubscriptionToBackend(subscription);
  } catch (error) {
    console.error('❌ Failed to subscribe to push notifications:', error);
  }
}

// Get VAPID public key (you'll need to generate this)
function getVapidPublicKey(): string {
  // TODO: Generate VAPID keys using web-push library
  // For now, return empty string (notifications will work without push)
  return '';
}

// Send subscription to backend
async function sendSubscriptionToBackend(subscription: PushSubscription): Promise<void> {
  try {
    await fetch(`${NOTIFICATIONS_ENDPOINT}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(subscription),
    });
    console.log('✅ Subscription sent to backend');
  } catch (error) {
    console.error('❌ Failed to send subscription to backend:', error);
  }
}

// Show local notification (doesn't require permission)
export function showLocalNotification(title: string, options?: NotificationOptions): void {
  if (!areNotificationsSupported()) {
    console.log('❌ Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.log('❌ Notification permission not granted');
    return;
  }

  try {
    new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-96x96.png',
      ...options,
    });
  } catch (error) {
    console.error('❌ Failed to show notification:', error);
  }
}

// Show service worker notification (works in background)
export async function showServiceWorkerNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-96x96.png',
      ...options,
    });
  } catch (error) {
    console.error('❌ Failed to show service worker notification:', error);
  }
}

// Utility function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Pre-defined notification templates
export const NotificationTemplates = {
  quizReminder: {
    title: '🕌 Zeit für dein islamisches Quiz!',
    body: 'Teste dein Wissen und lerne etwas Neues.',
    tag: 'quiz-reminder',
  },
  
  dailyQuestion: {
    title: '📖 Tägliche Quiz-Frage',
    body: 'Eine neue Frage wartet auf dich!',
    tag: 'daily-question',
  },
  
  achievementUnlocked: (achievement: string) => ({
    title: '🏆 Achievement freigeschaltet!',
    body: `Du hast "${achievement}" erreicht!`,
    tag: 'achievement',
  }),
  
  streakReminder: (days: number) => ({
    title: `🔥 ${days} Tage Streak!`,
    body: 'Behalte deine Lernstreak - spiele heute ein Quiz!',
    tag: 'streak',
  }),
};
