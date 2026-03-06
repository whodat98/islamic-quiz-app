/**
 * Offline Support Utilities
 * Speichert Quiz-Daten im LocalStorage für Offline-Zugriff
 */

const OFFLINE_CACHE_KEY = 'islamic-quiz-offline-data';
const OFFLINE_VERSION = '1';

interface OfflineData {
  version: string;
  timestamp: number;
  questions: any[];
}

/**
 * Speichert Fragen für Offline-Nutzung
 */
export function cacheQuestionsOffline(questions: any[]): void {
  try {
    const data: OfflineData = {
      version: OFFLINE_VERSION,
      timestamp: Date.now(),
      questions
    };
    localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(data));
    console.log('✅ Fragen im Offline-Cache gespeichert');
  } catch (error) {
    console.error('❌ Fehler beim Speichern im Offline-Cache:', error);
  }
}

/**
 * Lädt Fragen aus dem Offline-Cache
 */
export function getOfflineQuestions(): any[] | null {
  try {
    const cached = localStorage.getItem(OFFLINE_CACHE_KEY);
    if (!cached) {
      return null;
    }

    const data: OfflineData = JSON.parse(cached);
    
    // Check version
    if (data.version !== OFFLINE_VERSION) {
      console.log('⚠️ Offline-Cache Version veraltet');
      return null;
    }

    // Check if cache is not too old (max 7 days)
    const daysSinceCache = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
    if (daysSinceCache > 7) {
      console.log('⚠️ Offline-Cache zu alt');
      return null;
    }

    console.log('✅ Fragen aus Offline-Cache geladen');
    return data.questions;
  } catch (error) {
    console.error('❌ Fehler beim Laden aus Offline-Cache:', error);
    return null;
  }
}

/**
 * Prüft ob die App online ist
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Registriert Listener für Online/Offline Events
 */
export function registerOnlineListeners(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}
