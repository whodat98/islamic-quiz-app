import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { categories } from '../data/questions';
import { questions } from '../data/questionIdMapper';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { useTranslation } from '../i18n';
import { getLocalizedCategoryName } from '../data/questionsHelper';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProfileSwitcher } from './ProfileSwitcher';
import { DuellMenu } from './DuellMenu';
import { AdBanner } from './AdBanner';
import { projectId } from '/utils/supabase/info';
import { BookOpen, Trophy, Clock, TrendingUp, LogOut, Info } from 'lucide-react';

interface UserProgress {
  answeredQuestions: { [key: number]: boolean };
  categoryProgress: { [key: string]: number };
  totalScore: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, accessToken, signOut } = useAuth();
  const { language } = useLanguage();
  const { currentProfile } = useProfile();
  const t = useTranslation(language);
  const [userData, setUserData] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  // Redirect zur Profil-Auswahl, wenn kein Profil ausgewählt ist
  useEffect(() => {
    if (!currentProfile) {
      console.log('⚠️ Kein Profil ausgewählt - Weiterleitung zu Profil-Auswahl');
      navigate('/profiles');
      return;
    }
  }, [currentProfile, navigate]);

  useEffect(() => {
    // Lade Daten beim Start - KEINE Auth nötig!
    if (currentProfile) {
      loadUserData();
    }
  }, [currentProfile]);

  const loadUserData = async () => {
    setLoading(true);
    
    // Optional: Wenn User eingeloggt ist, lade seine Daten
    if (accessToken) {
      await loadProgress();
    } else {
      // KEIN Login - lade Fortschritt aus localStorage (profil-spezifisch!)
      console.log(`ℹ️ Kein Login - lade Fortschritt für Profil: ${currentProfile?.name}`);
      try {
        const profileKey = `quiz_progress_${currentProfile?.id}`;
        const savedProgressStr = localStorage.getItem(profileKey);
        if (savedProgressStr) {
          const savedProgress = JSON.parse(savedProgressStr);
          console.log(`✅ Fortschritt für Profil "${currentProfile?.name}" geladen:`, Object.keys(savedProgress.answeredQuestions || {}).length, 'Fragen');
          setUserData(savedProgress);
        } else {
          console.log(`ℹ️ Kein gespeicherter Fortschritt für Profil "${currentProfile?.name}" - starte mit leeren Daten`);
          setUserData({
            answeredQuestions: {},
            categoryProgress: {},
            totalScore: 0
          });
        }
      } catch (error) {
        console.error('❌ Fehler beim Laden aus localStorage:', error);
        setUserData({
          answeredQuestions: {},
          categoryProgress: {},
          totalScore: 0
        });
      }
    }
    
    // Fertig laden - auch OHNE Login!
    setLoading(false);
  };

  const loadProgress = async () => {
    const logs: string[] = [];
    
    try {
      logs.push('=== DASHBOARD LOAD START ===');
      logs.push(`Has accessToken: ${!!accessToken}`);
      
      // KEIN REDIRECT MEHR - Auth ist optional!
      if (!accessToken) {
        logs.push('ℹ️ Kein Login - nutze App ohne Fortschritt-Speicherung');
        setDebugInfo(logs);
        console.log(logs.join('\n'));
        return; // Einfach returnen, KEIN navigate('/login')!
      }

      logs.push('✅ Loading progress from server...');
      console.log('✅ Loading progress from server...');

      // Load user progress
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/progress`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        
        let serverProgress = null;
        if (response.ok && data.progress) {
          serverProgress = data.progress;
          logs.push('✅ Progress loaded from server');
        } else {
          logs.push('ℹ️ No server progress found');
        }

        // MERGE mit localStorage (falls User vorher ohne Login gespielt hat)
        try {
          const localProgressStr = localStorage.getItem('quiz_progress');
          if (localProgressStr) {
            const localProgress = JSON.parse(localProgressStr);
            logs.push(`ℹ️ Found local progress: ${Object.keys(localProgress.answeredQuestions || {}).length} questions`);
            
            // Merge server + local progress
            const mergedProgress = {
              answeredQuestions: {
                ...(serverProgress?.answeredQuestions || {}),
                ...(localProgress.answeredQuestions || {})
              },
              categoryProgress: {
                ...(serverProgress?.categoryProgress || {}),
                ...(localProgress.categoryProgress || {})
              },
              totalScore: Math.max(
                serverProgress?.totalScore || 0,
                localProgress.totalScore || 0
              )
            };
            
            setUserData(mergedProgress);
            logs.push('✅ Merged server + local progress');
            
            // Speichere den gemergten Fortschritt zurück auf den Server
            if (Object.keys(localProgress.answeredQuestions || {}).length > 0) {
              logs.push('💾 Syncing local progress to server...');
              await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/progress`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({ progress: mergedProgress }),
                }
              );
              logs.push('✅ Local progress synced to server');
            }
          } else {
            // Kein local progress, nutze nur server progress
            setUserData(serverProgress || {
              answeredQuestions: {},
              categoryProgress: {},
              totalScore: 0
            });
          }
        } catch (localError) {
          logs.push(`⚠️ Error accessing localStorage: ${localError}`);
          // Fallback zu server progress
          setUserData(serverProgress || {
            answeredQuestions: {},
            categoryProgress: {},
            totalScore: 0
          });
        }
      } catch (error: any) {
        logs.push(`❌ Error loading progress: ${error.message}`);
        console.error('Fehler beim Laden der Daten:', error);
      } finally {
        setDebugInfo(logs);
        console.log(logs.join('\n'));
        setLoading(false);
      }
    } catch (error: any) {
      console.error('CRITICAL ERROR in Dashboard:', error);
      setError(`Kritischer Fehler: ${error.message}`);
      setDebugInfo(logs);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Show error if something went wrong
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Fehler aufgetreten</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="bg-gray-100 p-4 rounded text-xs font-mono mb-4 max-h-96 overflow-auto">
            {debugInfo.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/payment')}>Zur Zahlungsseite</Button>
            <Button onClick={() => navigate('/login')} variant="outline">Zum Login</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center max-w-4xl w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-xl mb-6">Lade Daten...</p>
          <div className="mt-4 bg-white p-6 rounded-lg shadow-lg text-sm font-mono text-left max-h-[600px] overflow-auto">
            <div className="font-bold text-lg mb-4 text-emerald-600">🔍 DEBUG LOGS:</div>
            {debugInfo.map((log, i) => (
              <div 
                key={i} 
                className={`py-1 ${
                  log.includes('❌') ? 'text-red-600 font-bold' : 
                  log.includes('✅') ? 'text-green-600 font-bold' : 
                  log.includes('🎉') ? 'text-purple-600 font-bold' : 
                  'text-gray-700'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ALLE 300 FRAGEN SIND JETZT KOSTENLOS FREIGESCHALTET!
  const totalQuestions = 300; // 🔥 100% KOSTENLOS - Werbung finanziert die App
  const completedQuestions = Object.keys(userData.answeredQuestions || {}).length;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;
  
  // Debug logging
  console.log('📊 DASHBOARD STATS:');
  console.log('  - Completed Questions:', completedQuestions);
  console.log('  - Total Questions:', totalQuestions);
  console.log('  - Progress:', progressPercentage.toFixed(1) + '%');
  console.log('  - AnsweredQuestions:', userData.answeredQuestions);

  const getCategoryQuestionCount = (category: string): number => {
    if (category === "Alle") return 300; // Alle Fragen kostenlos!
    
    // ALLE 300 FRAGEN SIND KOSTENLOS FREIGESCHALTET!
    const questionCounts: { [key: string]: number } = {
      "Quran": 57,
      "Hadith": 57,
      "Fiqh": 57,
      "Seerah": 47,
      "Geschichte": 46,
      "Aqidah": 36
    };
    
    return questionCounts[category] || 0;
  };

  const getCategoryProgress = (category: string): number => {
    if (category === "Alle") return progressPercentage;
    
    // Berechne categoryProgress aus answeredQuestions statt vom Backend
    const answeredQuestionIds = Object.keys(userData.answeredQuestions).map(id => parseInt(id));
    
    // Zähle wie viele Fragen in dieser Kategorie beantwortet wurden
    const answeredInCategory = questions.filter(q => 
      q.category === category && answeredQuestionIds.includes(q.id)
    ).length;
    
    const totalInCategory = getCategoryQuestionCount(category);
    return totalInCategory > 0 ? (answeredInCategory / totalInCategory) * 100 : 0;
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Debug Banner */}
      {completedQuestions > 0 && (
        <div className="bg-emerald-600 text-white text-center py-2 px-4 text-sm">
          ✅ {language === 'ar' ? `تم حفظ التقدم: ${completedQuestions} سؤال تمت الإجابة عليه (${progressPercentage.toFixed(1)}%)` : `Fortschritt wird gespeichert: ${completedQuestions} Fragen beantwortet (${progressPercentage.toFixed(1)}%)`}
        </div>
      )}
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t.dashboard.title}
              </h1>
              <p className="text-gray-600 mt-1">{t.dashboard.welcome}, {currentProfile?.name || t.dashboard.welcome}!</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/about')}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
              </Button>
              <LanguageSwitcher />
              <ProfileSwitcher />
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                {t.dashboard.signOut}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistiken */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.dashboard.questionsAnswered}</p>
                <p className="text-2xl font-bold text-gray-800">{completedQuestions}/300</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.dashboard.totalScore}</p>
                <p className="text-2xl font-bold text-gray-800">{userData.totalScore}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.dashboard.categories}</p>
                <p className="text-2xl font-bold text-gray-800">6</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{language === 'ar' ? 'التقدم' : 'Fortschritt'}</p>
                <p className="text-2xl font-bold text-gray-800">{progressPercentage.toFixed(0)}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Gesamtfortschritt */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.dashboard.totalProgress}</h2>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {completedQuestions} {t.dashboard.of} {totalQuestions} {t.dashboard.answered}
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Kategorien */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{t.dashboard.categories}</h2>
            <div className="space-y-3">
              {categories.filter(cat => cat !== "Alle").map((category) => (
                <Card key={category} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{getLocalizedCategoryName(category, language)}</h3>
                    <span className="text-sm text-gray-600">
                      {getCategoryQuestionCount(category)} {language === 'ar' ? 'سؤال' : 'Fragen'}
                    </span>
                  </div>
                  <Progress value={getCategoryProgress(category)} className="h-2 mb-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">
                      {getCategoryProgress(category).toFixed(0)}% {language === 'ar' ? 'مكتمل' : 'abgeschlossen'}
                    </span>
                    <Button
                      onClick={() => navigate(`/quiz/${category}`)}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {t.dashboard.startQuiz}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Info und Schnellstart */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Starte jetzt!</h2>
            
            {/* 🆓 100% KOSTENLOS - Werbung finanziert */}
            <Card className="p-6 mb-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300">
              <h3 className="font-bold text-lg mb-2 text-emerald-800">🎉 100% Kostenlos!</h3>
              <p className="text-sm text-gray-700 mb-2">
                Du hast Zugriff auf <strong>alle 300 Fragen</strong> in 6 Kategorien - komplett gratis!
              </p>
              <p className="text-xs text-gray-600">
                🙏 Diese App wird durch Werbung finanziert. Vielen Dank für deine Unterstützung!
              </p>
            </Card>

            {/* 📢 AD BANNER - DIREKT INLINE OHNE COMPONENT */}
            <div className="mb-4 border-4 border-dashed border-emerald-500 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-8 text-center shadow-lg">
              <div className="text-3xl font-bold text-emerald-700 mb-3">
                📢 WERBEBEREICH
              </div>
              <div className="text-lg text-gray-700 font-semibold mb-2">
                🆓 100% GRATIS APP • WERBUNG ERMÖGLICHT KOSTENLOSE NUTZUNG
              </div>
              <div className="text-sm text-gray-600 mt-3 bg-white/50 rounded p-3 inline-block">
                ℹ️ Echte Google AdMob Ads erscheinen nach Vercel-Deploy
              </div>
            </div>

            {/* Schnellstart */}
            <Card className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <h3 className="font-bold text-lg mb-3">Bereit für eine Herausforderung?</h3>
              <p className="text-sm mb-4 opacity-90">
                Teste dein Wissen über alle Kategorien hinweg
              </p>
              <Button
                onClick={() => navigate('/quiz/Alle')}
                className="w-full bg-white text-emerald-600 hover:bg-gray-100"
              >
                Gemischtes Quiz starten
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Duell Button */}
      <DuellMenu />
    </div>
  );
}