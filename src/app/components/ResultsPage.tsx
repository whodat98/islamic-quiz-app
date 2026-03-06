import { useLocation, useNavigate } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../i18n';
import { getLocalizedCategoryName } from '../data/questionsHelper';
import { Trophy, Home, RefreshCw, Target, Clock } from 'lucide-react';

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Redirect to dashboard if no state is available
  if (!location.state) {
    navigate('/dashboard');
    return null;
  }
  
  const { score, totalQuestions, category, timeSpent } = location.state as {
    score: number;
    totalQuestions: number;
    category: string;
    timeSpent: number;
  };

  const percentage = (score / totalQuestions) * 100;
  const averageTimePerQuestion = Math.floor(timeSpent / totalQuestions);

  const getPerformanceMessage = () => {
    if (language === 'ar') {
      if (percentage >= 90) return { message: "ممتاز! أنت خبير حقيقي!", color: "text-emerald-600", emoji: "🌟" };
      if (percentage >= 75) return { message: "جيد جداً! لديك معرفة قوية!", color: "text-green-600", emoji: "🎯" };
      if (percentage >= 60) return { message: "أحسنت! استمر!", color: "text-blue-600", emoji: "👍" };
      if (percentage >= 50) return { message: "ليس سيئاً! هناك مجال للتحسين.", color: "text-yellow-600", emoji: "📚" };
      return { message: "استمر! الممارسة تصنع الإتقان!", color: "text-orange-600", emoji: "💪" };
    } else {
      if (percentage >= 90) return { message: "Ausgezeichnet! Du bist ein wahrer Experte!", color: "text-emerald-600", emoji: "🌟" };
      if (percentage >= 75) return { message: "Sehr gut! Du hast ein solides Wissen!", color: "text-green-600", emoji: "🎯" };
      if (percentage >= 60) return { message: "Gut gemacht! Weiter so!", color: "text-blue-600", emoji: "👍" };
      if (percentage >= 50) return { message: "Nicht schlecht! Es gibt noch Raum für Verbesserung.", color: "text-yellow-600", emoji: "📚" };
      return { message: "Bleib dran! Übung macht den Meister!", color: "text-orange-600", emoji: "💪" };
    }
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="p-8 text-center shadow-2xl">
          {/* Trophy Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Titel */}
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {t.results.title}
          </h1>
          <p className="text-gray-600 mb-8">{getLocalizedCategoryName(category, language)}</p>

          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8">
            <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {score}/{totalQuestions}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {percentage.toFixed(0)}% {t.results.correctAnswers}
            </div>
            <div className={`text-xl ${performance.color} font-medium`}>
              {performance.emoji} {performance.message}
            </div>
          </div>

          {/* Statistiken */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <Target className="h-5 w-5" />
                <span className="text-sm font-medium">{language === 'ar' ? 'الدقة' : 'Genauigkeit'}</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">
                {percentage.toFixed(1)}%
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">{language === 'ar' ? 'متوسط كل سؤال' : 'Ø pro Frage'}</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {averageTimePerQuestion}s
              </div>
            </Card>
          </div>

          {/* Detaillierte Aufschlüsselung */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-4">Zusammenfassung</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Richtige Antworten:</span>
                <span className="font-semibold text-green-600">{score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Falsche Antworten:</span>
                <span className="font-semibold text-red-600">{totalQuestions - score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gesamtzeit:</span>
                <span className="font-semibold text-blue-600">{Math.floor(timeSpent / 60)} Min. {timeSpent % 60} Sek.</span>
              </div>
            </div>
          </div>

          {/* Aktionen */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate(`/quiz/${category}`)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2"
              size="lg"
            >
              <RefreshCw className="h-5 w-5" />
              {t.results.tryAgain}
            </Button>
            
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="w-full gap-2"
              size="lg"
            >
              <Home className="h-5 w-5" />
              {t.results.backToDashboard}
            </Button>
          </div>

          {/* Motivationsnachricht */}
          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
            <p className="text-sm text-gray-700 italic">
              "Das Streben nach Wissen ist eine Pflicht für jeden Muslim."
              <span className="block mt-1 text-xs text-gray-600">- Überliefert von Ibn Majah</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
