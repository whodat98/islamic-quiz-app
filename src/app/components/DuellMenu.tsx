import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDuell } from '../context/DuellContext';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Swords, Plus, LogIn, X } from 'lucide-react';

export function DuellMenu() {
  const navigate = useNavigate();
  const { createDuell, joinDuell } = useDuell();
  const { language } = useLanguage();
  const { currentProfile } = useProfile();
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [totalRounds, setTotalRounds] = useState(5);
  const [duellCode, setDuellCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Alle', 'Quran', 'Hadith', 'Fiqh', 'Seerah', 'Islamische Geschichte', 'Aqidah'];

  const handleCreateDuell = async () => {
    if (!currentProfile) {
      setError('Bitte wähle zuerst ein Profil aus');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const duellId = await createDuell(selectedCategory, totalRounds);
      navigate(`/duell/${duellId}/waiting`);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Erstellen des Duells');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinDuell = async () => {
    if (!currentProfile) {
      setError('Bitte wähle zuerst ein Profil aus');
      return;
    }

    if (!duellCode.trim()) {
      setError('Bitte gib einen Duell-Code ein');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await joinDuell(duellCode.trim());
      if (success) {
        navigate(`/duell/${duellCode.trim()}/play`);
      } else {
        setError('Duell nicht gefunden oder bereits voll');
      }
    } catch (err: any) {
      setError(err.message || 'Fehler beim Beitreten');
    } finally {
      setLoading(false);
    }
  };

  if (!showMenu) {
    return (
      <Button
        onClick={() => setShowMenu(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg rounded-full w-16 h-16 flex items-center justify-center z-50"
        title={language === 'de' ? 'Quizduell starten' : 'بدء مبارزة'}
      >
        <Swords className="w-8 h-8" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white dark:bg-gray-800 p-6 relative">
        <button
          onClick={() => {
            setShowMenu(false);
            setShowCreateForm(false);
            setShowJoinForm(false);
            setError('');
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Swords className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'de' ? 'Quizduell' : 'مبارزة الأسئلة'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {language === 'de' 
              ? 'Fordere andere Spieler heraus!' 
              : 'تحدى لاعبين آخرين!'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {!showCreateForm && !showJoinForm && (
          <div className="space-y-3">
            <Button
              onClick={() => setShowCreateForm(true)}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white gap-2"
            >
              <Plus className="w-5 h-5" />
              {language === 'de' ? 'Neues Duell erstellen' : 'إنشاء مبارزة جديدة'}
            </Button>

            <Button
              onClick={() => setShowJoinForm(true)}
              variant="outline"
              className="w-full gap-2"
            >
              <LogIn className="w-5 h-5" />
              {language === 'de' ? 'Duell beitreten' : 'الانضمام إلى مبارزة'}
            </Button>
          </div>
        )}

        {/* Create Duell Form */}
        {showCreateForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {language === 'de' ? 'Kategorie' : 'الفئة'}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {language === 'de' ? 'Anzahl Fragen' : 'عدد الأسئلة'}
              </label>
              <select
                value={totalRounds}
                onChange={(e) => setTotalRounds(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={5}>5 Fragen</option>
                <option value={10}>10 Fragen</option>
                <option value={15}>15 Fragen</option>
                <option value={20}>20 Fragen</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                className="flex-1"
              >
                {language === 'de' ? 'Zurück' : 'رجوع'}
              </Button>
              <Button
                onClick={handleCreateDuell}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                {loading ? '...' : (language === 'de' ? 'Erstellen' : 'إنشاء')}
              </Button>
            </div>
          </div>
        )}

        {/* Join Duell Form */}
        {showJoinForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {language === 'de' ? 'Duell-Code' : 'رمز المبارزة'}
              </label>
              <input
                type="text"
                value={duellCode}
                onChange={(e) => setDuellCode(e.target.value)}
                placeholder={language === 'de' ? 'z.B. duell_abc123' : 'مثل: duell_abc123'}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowJoinForm(false)}
                variant="outline"
                className="flex-1"
              >
                {language === 'de' ? 'Zurück' : 'رجوع'}
              </Button>
              <Button
                onClick={handleJoinDuell}
                disabled={loading || !duellCode.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {loading ? '...' : (language === 'de' ? 'Beitreten' : 'انضمام')}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
