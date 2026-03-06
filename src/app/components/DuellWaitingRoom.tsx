import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDuell } from '../context/DuellContext';
import { useLanguage } from '../context/LanguageContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Users, Clock, ArrowLeft, Check } from 'lucide-react';

export function DuellWaitingRoom() {
  const { duellId } = useParams<{ duellId: string }>();
  const navigate = useNavigate();
  const { getDuell, setCurrentDuell } = useDuell();
  const { language } = useLanguage();
  const [duell, setDuell] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!duellId) {
      navigate('/dashboard');
      return;
    }

    loadDuell();
    const interval = setInterval(loadDuell, 2000); // Poll alle 2 Sekunden

    return () => clearInterval(interval);
  }, [duellId]);

  const loadDuell = async () => {
    if (!duellId) return;

    const duellData = await getDuell(duellId);
    if (duellData) {
      setDuell(duellData);
      setLoading(false);

      // Wenn Spieler 2 beigetreten ist, starte das Spiel
      if (duellData.player2) {
        setCurrentDuell(duellData);
        navigate(`/duell/${duellId}/play`);
      }
    } else {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!duellId) return;
    
    // Fallback-Methode für Browser, die Clipboard API blockieren
    const copyToClipboardFallback = (text: string) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
      } finally {
        document.body.removeChild(textArea);
      }
    };

    // Versuche zuerst die moderne Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(duellId)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.log('Clipboard API failed, using fallback:', err);
          copyToClipboardFallback(duellId);
        });
    } else {
      // Fallback für Browser ohne Clipboard API
      copyToClipboardFallback(duellId);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'de' ? 'Lade Duell...' : 'تحميل المبارزة...'}
          </p>
        </div>
      </div>
    );
  }

  if (!duell) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {language === 'de' ? 'Duell nicht gefunden' : 'المبارزة غير موجودة'}
          </h2>
          <Button onClick={() => navigate('/dashboard')} className="w-full">
            {language === 'de' ? 'Zurück zum Dashboard' : 'العودة إلى لوحة التحكم'}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'de' ? 'Abbrechen' : 'إلغاء'}
          </Button>
        </div>

        {/* Waiting Card */}
        <Card className="p-8 bg-white dark:bg-gray-800">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'de' ? 'Warte auf Gegner...' : 'في انتظار الخصم...'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'de' 
                ? 'Teile den Code mit einem Freund!' 
                : 'شارك الرمز مع صديق!'}
            </p>
          </div>

          {/* Duell Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {language === 'de' ? 'Kategorie' : 'الفئة'}
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {duell.category}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {language === 'de' ? 'Fragen' : 'الأسئلة'}
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {duell.totalRounds}
                </p>
              </div>
            </div>

            {/* Code */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-purple-300 dark:border-purple-600">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 text-center">
                {language === 'de' ? 'Duell-Code' : 'رمز المبارزة'}
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-center font-mono text-lg font-bold text-purple-600 dark:text-purple-400 break-all">
                  {duellId}
                </code>
                <Button
                  onClick={handleCopyCode}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Player 1 */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {language === 'de' ? 'Spieler 1 (Du)' : 'اللاعب 1 (أنت)'}
            </p>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2" 
                 style={{ borderColor: duell.player1.profileColor }}>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ 
                  backgroundColor: duell.player1.profileColor + '20', 
                  color: duell.player1.profileColor 
                }}
              >
                {duell.player1.profileAvatar}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white">
                  {duell.player1.profileName}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✓ {language === 'de' ? 'Bereit' : 'جاهز'}
                </p>
              </div>
            </div>
          </div>

          {/* Player 2 Placeholder */}
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {language === 'de' ? 'Spieler 2' : 'اللاعب 2'}
            </p>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-400 animate-spin" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {language === 'de' ? 'Wartet auf Gegner...' : 'في انتظار الخصم...'}
                </p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {language === 'de' 
                ? 'Das Duell startet automatisch, sobald ein Gegner beitritt' 
                : 'ستبدأ المبارزة تلقائياً عندما ينضم خصم'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}