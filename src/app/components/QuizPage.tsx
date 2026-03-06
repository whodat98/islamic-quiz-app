import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Question } from '../data/questionIdMapper';
import { getLocalizedQuestions, getLocalizedCategoryName } from '../data/questionsHelper';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../i18n';
import { projectId } from '/utils/supabase/info';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';

export function QuizPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { accessToken, checkPaymentStatus } = useAuth();
  const { currentProfile } = useProfile();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // States
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);

  // 🔥 INITIALIZE QUIZ - NUR EINMAL BEIM START!
  useEffect(() => {
    const initializeQuiz = async () => {
      // Optional: Check if user is logged in
      if (accessToken) {
        const paid = await checkPaymentStatus();
        setHasPaid(paid);
      }

      console.log('🎯 INITIALISIERE QUIZ - Version 4.0 - KEINE AUTH NÖTIG');
      console.log('🏷️ Kategorie:', category);

      if (!category) {
        console.error('❌ Keine Kategorie angegeben');
        navigate('/dashboard');
        return;
      }

      // 🎉 ALLE 300 FRAGEN VERFÜGBAR (in gewählter Sprache)!
      const availableQuestions = getLocalizedQuestions(language);
      console.log('📦 Verfügbare Fragen:', availableQuestions.length);

      // Filter nach Kategorie (category ist immer in Deutsch, auch wenn UI auf Arabisch ist)
      const filtered = category === 'Alle' 
        ? availableQuestions 
        : availableQuestions.filter(q => q.category === category);
      
      console.log('✅ Gefilterte Fragen:', filtered.length);

      if (filtered.length === 0) {
        console.error('❌ Keine Fragen für Kategorie:', category);
        setLoading(false);
        return;
      }

      // 🎲 MISCHE FRAGEN NUR EINMAL!
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      // ALLE FRAGEN DER KATEGORIE WERDEN VERWENDET (keine Begrenzung mehr auf 20)
      const quizSet = shuffled;
      
      console.log('🎲 Quiz-Set erstellt:', quizSet.length, 'Fragen');
      console.log('📝 Erste Frage:', quizSet[0]?.question.substring(0, 50) + '...');

      setQuizQuestions(quizSet);
      setLoading(false);
    };

    initializeQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, category]); // Reload when language or category changes

  // 🔒 RESET STATE BEI FRAGE-WECHSEL
  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [currentQuestionIndex]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.quiz.loading}</p>
        </div>
      </div>
    );
  }

  // KEINE FRAGEN VERFÜGBAR
  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Keine Fragen verfügbar</h2>
          <p className="text-gray-600 mb-6">
            Für die Kategorie "{category}" wurden keine Fragen gefunden.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="w-full">
            Zurück zum Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // SICHERHEITSCHECK
  if (!currentQuestion) {
    console.error('❌ Keine aktuelle Frage! Index:', currentQuestionIndex);
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Fehler</h2>
          <p className="text-gray-600 mb-6">
            Es gab einen Fehler beim Laden der Frage. Bitte versuche es erneut.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="w-full">
            Zurück zum Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // ==================== HANDLER ====================

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) {
      console.log('⚠️ Ignoriere Click - Erklärung aktiv');
      return;
    }
    console.log('✅ Antwort gewählt:', answerIndex);
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) {
      console.log('⚠️ Keine Antwort gewählt');
      return;
    }
    
    console.log('📝 Prüfe:', selectedAnswer, 'vs. richtig:', currentQuestion.correctAnswer);
    setShowExplanation(true);
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    let newScore = score;
    
    if (isCorrect) {
      console.log('✅ RICHTIG!');
      newScore = score + 1;
      setScore(newScore);
    } else {
      console.log('❌ FALSCH!');
    }
    
    // Füge Frage zu beantwortet hinzu
    const newAnsweredQuestions = [...answeredQuestions, currentQuestion.id];
    setAnsweredQuestions(newAnsweredQuestions);
    
    // 💾 SPEICHERE FORTSCHRITT SOFORT nach jeder Antwort!
    await saveProgressToBackend(newScore, newAnsweredQuestions);
  };

  const handleNextQuestion = async () => {
    console.log('➡️ Nächste Frage - Index:', currentQuestionIndex, 'von', quizQuestions.length - 1);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz beendet
      console.log('🏁 Quiz beendet! Score:', score);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      navigate('/results', { 
        state: { 
          score, 
          totalQuestions: quizQuestions.length,
          category: category || 'Alle',
          timeSpent 
        } 
      });
    }
  };

  const saveProgressToBackend = async (currentScore: number, currentAnsweredQuestions: number[]) => {
    try {
      // Konvertiere Array zu Object mit boolean values
      const answeredQuestionsObj: { [key: number]: boolean } = {};
      currentAnsweredQuestions.forEach(id => {
        answeredQuestionsObj[id] = true;
      });

      const progressData = {
        answeredQuestions: answeredQuestionsObj,
        categoryProgress: {
          [category || 'Alle']: currentAnsweredQuestions.length
        },
        totalScore: currentScore
      };

      // IMMER im localStorage speichern (profil-spezifisch!)
      try {
        // Lade existierenden Fortschritt aus localStorage mit profil-spezifischem Key
        const profileKey = `quiz_progress_${currentProfile?.id}`;
        const existingProgressStr = localStorage.getItem(profileKey);
        const existingProgress = existingProgressStr ? JSON.parse(existingProgressStr) : {
          answeredQuestions: {},
          categoryProgress: {},
          totalScore: 0
        };

        // Merge mit existierendem Fortschritt
        const mergedProgress = {
          answeredQuestions: {
            ...existingProgress.answeredQuestions,
            ...answeredQuestionsObj
          },
          categoryProgress: {
            ...existingProgress.categoryProgress,
            ...progressData.categoryProgress
          },
          totalScore: Math.max(existingProgress.totalScore || 0, currentScore)
        };

        localStorage.setItem(profileKey, JSON.stringify(mergedProgress));
        console.log(`💾 Fortschritt für Profil "${currentProfile?.name}" in localStorage gespeichert: ${currentAnsweredQuestions.length} Fragen`);
      } catch (localStorageError) {
        console.error('⚠️ Fehler beim Speichern in localStorage:', localStorageError);
      }

      // Wenn eingeloggt, AUCH auf Server speichern
      if (accessToken) {
        console.log(`💾 Speichere Fortschritt auf Server: ${currentAnsweredQuestions.length} Fragen, Score: ${currentScore}`);

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/progress`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              progress: progressData
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ Fehler beim Speichern auf Server:', errorData);
        } else {
          const data = await response.json();
          console.log('✅ Fortschritt erfolgreich auf Server gespeichert:', data);
        }
      } else {
        console.log(`ℹ️ Kein Login - Fortschritt nur für Profil "${currentProfile?.name}" in localStorage gespeichert`);
      }
    } catch (error) {
      console.error('❌ Exception beim Speichern:', error);
    }
  };

  // ==================== RENDER ====================

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* DEBUG BANNER */}
      <div className="bg-emerald-600 text-white text-center py-2 px-4 font-bold text-sm">
        🎉 V5.0 - ALLE 300 FRAGEN FREIGESCHALTET! | Kategorie: {category} | Quiz: {quizQuestions.length} Fragen
      </div>
      
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
            <div className="text-center">
              <h2 className="font-semibold text-gray-800">{getLocalizedCategoryName(category || 'Alle', language)}</h2>
              <p className="text-sm text-gray-600">
                {t.quiz.question} {currentQuestionIndex + 1} {t.quiz.of} {quizQuestions.length}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{Math.floor((Date.now() - startTime) / 1000 / 60)} Min.</span>
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </div>
      </div>

      {/* QUIZ CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          {/* FRAGE */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              {currentQuestion.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </h1>
          </div>

          {/* ANTWORTOPTIONEN */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              const showCorrect = showExplanation && isCorrectAnswer;
              const showWrong = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all
                    ${!showExplanation && isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}
                    ${!showExplanation && !isSelected ? 'hover:border-gray-300 hover:bg-gray-50' : ''}
                    ${showCorrect ? 'border-green-500 bg-green-50' : ''}
                    ${showWrong ? 'border-red-500 bg-red-50' : ''}
                    ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{option}</span>
                    {showCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {showWrong && <XCircle className="h-5 w-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ERKLÄRUNG */}
          {showExplanation && currentQuestion.explanation && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? t.quiz.correct : t.quiz.incorrect}
                  </p>
                  <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* AKTIONEN */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Punktestand: <span className="font-semibold text-emerald-600">{score}/{currentQuestionIndex + (showExplanation ? 1 : 0)}</span>
            </div>
            
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Antwort überprüfen
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? (
                  <>
                    {t.quiz.nextQuestion}
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  t.quiz.finishQuiz
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* FORTSCHRITT */}
        <div className="mt-6 text-center">
          <div className="inline-flex gap-2 flex-wrap justify-center">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full
                  ${index < currentQuestionIndex ? 'bg-emerald-500' : ''}
                  ${index === currentQuestionIndex ? 'bg-emerald-300 ring-2 ring-emerald-500' : ''}
                  ${index > currentQuestionIndex ? 'bg-gray-300' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}