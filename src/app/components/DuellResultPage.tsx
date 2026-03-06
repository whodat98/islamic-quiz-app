import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDuell } from '../context/DuellContext';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Trophy, Crown, Target, TrendingUp, Home, RotateCcw } from 'lucide-react';

export function DuellResultPage() {
  const { duellId } = useParams<{ duellId: string }>();
  const navigate = useNavigate();
  const { getDuell } = useDuell();
  const { currentProfile } = useProfile();
  const { language } = useLanguage();

  const [duell, setDuell] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!duellId) {
      navigate('/dashboard');
      return;
    }

    loadDuell();
    // Poll für Updates vom Gegner
    const interval = setInterval(loadDuell, 3000);
    return () => clearInterval(interval);
  }, [duellId]);

  const loadDuell = async () => {
    if (!duellId) return;

    const duellData = await getDuell(duellId);
    if (duellData) {
      setDuell(duellData);
      setLoading(false);
    }
  };

  if (loading || !duell) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'de' ? 'Lade Ergebnisse...' : 'تحميل النتائج...'}
          </p>
        </div>
      </div>
    );
  }

  const isPlayer1 = duell.player1.profileId === currentProfile?.id;
  const myPlayer = isPlayer1 ? duell.player1 : duell.player2;
  const opponentPlayer = isPlayer1 ? duell.player2 : duell.player1;

  const myScore = myPlayer?.score || 0;
  const opponentScore = opponentPlayer?.score || 0;
  const myAnswersCount = myPlayer?.answers?.length || 0;
  const opponentAnswersCount = opponentPlayer?.answers?.length || 0;

  const iWon = myScore > opponentScore;
  const isDraw = myScore === opponentScore;
  const opponentFinished = opponentAnswersCount >= duell.totalRounds;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Winner Banner */}
        <div className="text-center mb-8">
          {opponentFinished ? (
            <>
              {iWon && (
                <div className="mb-6">
                  <Crown className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'de' ? '🎉 Du hast gewonnen! 🎉' : '🎉 لقد فزت! 🎉'}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {language === 'de' ? 'Mashallah! Ausgezeichnetes Wissen!' : 'ماشاء الله! معرفة ممتازة!'}
                  </p>
                </div>
              )}
              {isDraw && (
                <div className="mb-6">
                  <Trophy className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'de' ? 'Unentschieden!' : 'تعادل!'}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {language === 'de' ? 'Beide haben gleich gut gespielt!' : 'كلاكما لعب بشكل جيد!'}
                  </p>
                </div>
              )}
              {!iWon && !isDraw && (
                <div className="mb-6">
                  <Trophy className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'de' ? 'Knapp verloren' : 'خسرت بفارق ضئيل'}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {language === 'de' ? 'Beim nächsten Mal klappt es!' : 'في المرة القادمة ستنجح!'}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'de' ? 'Warte auf Gegner...' : 'في انتظار الخصم...'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'de' 
                  ? `${opponentPlayer?.profileName || 'Dein Gegner'} hat ${opponentAnswersCount}/${duell.totalRounds} Fragen beantwortet`
                  : `${opponentPlayer?.profileName || 'خصمك'} أجاب على ${opponentAnswersCount}/${duell.totalRounds} أسئلة`}
              </p>
            </div>
          )}
        </div>

        {/* Results Card */}
        <Card className="p-8 bg-white dark:bg-gray-800 mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            {language === 'de' ? 'Endergebnis' : 'النتيجة النهائية'}
          </h2>

          {/* Score Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* My Score */}
            <div className={`p-6 rounded-lg border-4 ${iWon && opponentFinished ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ 
                    backgroundColor: myPlayer.profileColor + '20', 
                    color: myPlayer.profileColor 
                  }}
                >
                  {myPlayer.profileAvatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {myPlayer.profileName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'de' ? '(Du)' : '(أنت)'}
                  </p>
                </div>
                {iWon && opponentFinished && (
                  <Crown className="w-8 h-8 text-yellow-500" />
                )}
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {myScore}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'de' ? 'von' : 'من'} {duell.totalRounds} {language === 'de' ? 'Fragen' : 'أسئلة'}
                </p>
                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mt-2">
                  {Math.round((myScore / duell.totalRounds) * 100)}%
                </p>
              </div>
            </div>

            {/* Opponent Score */}
            <div className={`p-6 rounded-lg border-4 ${!iWon && !isDraw && opponentFinished ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ 
                    backgroundColor: (opponentPlayer?.profileColor || '#gray') + '20', 
                    color: opponentPlayer?.profileColor || '#gray' 
                  }}
                >
                  {opponentPlayer?.profileAvatar || '?'}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {opponentPlayer?.profileName || '???'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'de' ? '(Gegner)' : '(الخصم)'}
                  </p>
                </div>
                {!iWon && !isDraw && opponentFinished && (
                  <Crown className="w-8 h-8 text-yellow-500" />
                )}
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {opponentFinished ? opponentScore : '?'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'de' ? 'von' : 'من'} {duell.totalRounds} {language === 'de' ? 'Fragen' : 'أسئلة'}
                </p>
                {opponentFinished && (
                  <p className="text-lg font-semibold text-pink-600 dark:text-pink-400 mt-2">
                    {Math.round((opponentScore / duell.totalRounds) * 100)}%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {duell.totalRounds}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === 'de' ? 'Fragen' : 'أسئلة'}
              </p>
            </div>
            <div className="text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {duell.category}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === 'de' ? 'Kategorie' : 'الفئة'}
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {myScore > opponentScore ? '+' : ''}{myScore - opponentScore}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === 'de' ? 'Differenz' : 'الفرق'}
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Home className="w-4 h-4" />
            {language === 'de' ? 'Zum Dashboard' : 'إلى لوحة التحكم'}
          </Button>
          <Button
            onClick={() => navigate('/profiles')}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {language === 'de' ? 'Neues Duell' : 'مبارزة جديدة'}
          </Button>
        </div>
      </div>
    </div>
  );
}
