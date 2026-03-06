import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDuell } from '../context/DuellContext';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedQuestions } from '../data/questionsHelper';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Trophy, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function DuellPlayPage() {
  const { duellId } = useParams<{ duellId: string }>();
  const navigate = useNavigate();
  const { getDuell, submitAnswer, finishDuell } = useDuell();
  const { currentProfile } = useProfile();
  const { language } = useLanguage();

  const [duell, setDuell] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [myAnswers, setMyAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!duellId) {
      navigate('/dashboard');
      return;
    }

    loadDuell();
  }, [duellId]);

  const loadDuell = async () => {
    if (!duellId) return;

    const duellData = await getDuell(duellId);
    if (duellData) {
      setDuell(duellData);
      setLoading(false);

      // Lade bereits gegebene Antworten des aktuellen Spielers
      const isPlayer1 = duellData.player1.profileId === currentProfile?.id;
      const playerAnswers = isPlayer1 ? duellData.player1.answers : duellData.player2?.answers || [];
      setMyAnswers(playerAnswers);

      // Wenn alle Fragen beantwortet, zum Ergebnis
      if (playerAnswers.length >= duellData.totalRounds) {
        navigate(`/duell/${duellId}/result`);
      } else {
        setCurrentQuestionIndex(playerAnswers.length);
      }
    } else {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !duell || !duellId) return;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowExplanation(true);

    // Speichere Antwort auf Server
    try {
      await submitAnswer(duellId, currentQuestion.id, selectedAnswer, isCorrect);
      
      // Update lokale Antworten
      const newAnswer = {
        questionId: currentQuestion.id,
        answer: selectedAnswer,
        correct: isCorrect,
      };
      setMyAnswers([...myAnswers, newAnswer]);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  };

  const handleNextQuestion = async () => {
    if (!duell) return;

    if (currentQuestionIndex < duell.totalRounds - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Alle Fragen beantwortet
      if (duellId) {
        await finishDuell(duellId);
        navigate(`/duell/${duellId}/result`);
      }
    }
  };

  const getCurrentQuestion = () => {
    if (!duell) return null;
    
    const allQuestions = getLocalizedQuestions(language);
    const questionId = duell.questionIds[currentQuestionIndex];
    return allQuestions.find(q => q.id === questionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'de' ? 'Lade Duell...' : 'تحميل المبارزة...'}
          </p>
        </div>
      </div>
    );
  }

  if (!duell) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {language === 'de' ? 'Duell nicht gefunden' : 'المبارزة غير موجودة'}
          </h2>
          <Button onClick={() => navigate('/dashboard')} className="w-full">
            {language === 'de' ? 'Zurück' : 'رجوع'}
          </Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {language === 'de' ? 'Frage nicht gefunden' : 'السؤال غير موجود'}
          </h2>
          <Button onClick={() => navigate('/dashboard')} className="w-full">
            {language === 'de' ? 'Zurück' : 'رجوع'}
          </Button>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / duell.totalRounds) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const myScore = myAnswers.filter(a => a.correct).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Players */}
          <div className="flex items-center justify-between mb-4">
            {/* Player 1 */}
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ 
                  backgroundColor: duell.player1.profileColor + '20', 
                  color: duell.player1.profileColor 
                }}
              >
                {duell.player1.profileAvatar}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">
                  {duell.player1.profileName}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {duell.player1.score} {language === 'de' ? 'Punkte' : 'نقاط'}
                </p>
              </div>
            </div>

            {/* VS */}
            <div className="text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400">VS</p>
            </div>

            {/* Player 2 */}
            <div className="flex items-center gap-2">
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white text-right">
                  {duell.player2?.profileName || '???'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-right">
                  {duell.player2?.score || 0} {language === 'de' ? 'Punkte' : 'نقاط'}
                </p>
              </div>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ 
                  backgroundColor: (duell.player2?.profileColor || '#gray') + '20', 
                  color: duell.player2?.profileColor || '#gray' 
                }}
              >
                {duell.player2?.profileAvatar || '?'}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="text-center mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'de' ? 'Frage' : 'سؤال'} {currentQuestionIndex + 1} / {duell.totalRounds}
            </p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
            {currentQuestion.category}
          </span>

          {/* Question Text */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">
            {currentQuestion.question}
          </h1>

          {/* Answer Options */}
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
                    ${!showExplanation && isSelected ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700'}
                    ${!showExplanation && !isSelected ? 'hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                    ${showCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                    ${showWrong ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
                    ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{option}</span>
                    {showCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {showWrong && <XCircle className="h-5 w-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'}`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                    {isCorrect 
                      ? (language === 'de' ? 'Richtig!' : 'صحيح!') 
                      : (language === 'de' ? 'Falsch!' : 'خطأ!')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'de' ? 'Deine Punkte:' : 'نقاطك:'}{' '}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {myScore}/{currentQuestionIndex + (showExplanation ? 1 : 0)}
              </span>
            </div>

            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {language === 'de' ? 'Antwort prüfen' : 'تحقق من الإجابة'}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
              >
                {currentQuestionIndex < duell.totalRounds - 1 ? (
                  <>
                    {language === 'de' ? 'Nächste Frage' : 'السؤال التالي'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  language === 'de' ? 'Ergebnis anzeigen' : 'عرض النتيجة'
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
