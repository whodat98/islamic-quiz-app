/**
 * PWA Analytics - Track installations, usage, and engagement
 */

import { projectId, publicAnonKey } from '/utils/supabase/info';

const ANALYTICS_ENDPOINT = `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/analytics`;

interface AnalyticsEvent {
  event: string;
  timestamp: number;
  data?: Record<string, any>;
  sessionId?: string;
}

// Generate or retrieve session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics-session-id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics-session-id', sessionId);
  }
  return sessionId;
}

// Get user ID if logged in
function getUserId(): string | null {
  const userData = localStorage.getItem('user-data');
  if (userData) {
    try {
      const parsed = JSON.parse(userData);
      return parsed.id || null;
    } catch {
      return null;
    }
  }
  return null;
}

// Track generic event
export async function trackEvent(event: string, data?: Record<string, any>): Promise<void> {
  try {
    const analyticsData: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      sessionId: getSessionId(),
      data: {
        ...data,
        userId: getUserId(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      },
    };

    // Send to backend
    await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(analyticsData),
    });

    console.log(`📊 Analytics tracked: ${event}`);
  } catch (error) {
    console.error('❌ Analytics tracking failed:', error);
  }
}

// Track PWA installation
export function trackPWAInstall(): void {
  trackEvent('pwa_installed', {
    installMethod: 'beforeinstallprompt',
    displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser',
  });
}

// Track PWA prompt shown
export function trackPWAPromptShown(): void {
  trackEvent('pwa_prompt_shown');
}

// Track PWA prompt dismissed
export function trackPWAPromptDismissed(): void {
  trackEvent('pwa_prompt_dismissed');
}

// Track app launched as PWA
export function trackPWALaunch(): void {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    trackEvent('pwa_launched', {
      isStandalone: true,
    });
  }
}

// Track page views
export function trackPageView(page: string): void {
  trackEvent('page_view', {
    page,
    referrer: document.referrer,
  });
}

// Track quiz started
export function trackQuizStarted(category?: string): void {
  trackEvent('quiz_started', {
    category,
  });
}

// Track quiz completed
export function trackQuizCompleted(score: number, totalQuestions: number, category?: string): void {
  trackEvent('quiz_completed', {
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    category,
  });
}

// Track payment initiated
export function trackPaymentInitiated(): void {
  trackEvent('payment_initiated');
}

// Track payment success
export function trackPaymentSuccess(amount: number): void {
  trackEvent('payment_success', {
    amount,
  });
}

// Track signup
export function trackSignup(method: 'email' | 'google' | 'facebook'): void {
  trackEvent('user_signup', {
    method,
  });
}

// Track login
export function trackLogin(method: 'email' | 'google' | 'facebook'): void {
  trackEvent('user_login', {
    method,
  });
}

// Track offline usage
export function trackOfflineUsage(): void {
  trackEvent('app_used_offline');
}

// Track share
export function trackShare(method: string): void {
  trackEvent('app_shared', {
    method,
  });
}

// Get analytics stats (for admin dashboard)
export async function getAnalyticsStats(): Promise<any> {
  try {
    const response = await fetch(`${ANALYTICS_ENDPOINT}/stats`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch analytics stats');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to fetch analytics stats:', error);
    return null;
  }
}

// Initialize analytics on app load
export function initAnalytics(): void {
  // Track PWA launch
  trackPWALaunch();

  // Track when app goes offline
  window.addEventListener('offline', () => {
    trackOfflineUsage();
  });

  // Track beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', () => {
    trackPWAPromptShown();
  });

  // Track app installed
  window.addEventListener('appinstalled', () => {
    trackPWAInstall();
  });

  console.log('📊 Analytics initialized');
}
