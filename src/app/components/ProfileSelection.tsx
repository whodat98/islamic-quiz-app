import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useProfile, PROFILE_COLORS, PROFILE_AVATARS, MAX_PROFILES } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../i18n';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, Pencil, Trash2, User } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function ProfileSelection() {
  const navigate = useNavigate();
  const { profiles, selectProfile, createProfile, deleteProfile, canCreateProfile } = useProfile();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PROFILE_COLORS[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(PROFILE_AVATARS[0]);
  const [editingProfile, setEditingProfile] = useState<string | null>(null);

  const handleSelectProfile = (profileId: string) => {
    selectProfile(profileId);
    navigate('/');
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProfileName.trim()) {
      try {
        createProfile(newProfileName.trim(), selectedColor, selectedAvatar);
        setNewProfileName('');
        setShowCreateForm(false);
        setSelectedColor(PROFILE_COLORS[0]);
        setSelectedAvatar(PROFILE_AVATARS[0]);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const handleDeleteProfile = (profileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(language === 'de' 
      ? 'Möchten Sie dieses Profil wirklich löschen? Der gesamte Fortschritt geht verloren!' 
      : 'هل تريد حقاً حذف هذا الملف الشخصي؟ سيتم فقدان جميع التقدم!')) {
      deleteProfile(profileId);
      setEditingProfile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'de' ? 'Wer spielt?' : 'من يلعب؟'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'de' 
              ? 'Wähle dein Profil oder erstelle ein neues' 
              : 'اختر ملفك الشخصي أو أنشئ ملف جديد'}
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              className="group relative cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden border-4"
              style={{ borderColor: profile.color }}
              onClick={() => handleSelectProfile(profile.id)}
            >
              <div className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                {/* Avatar */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-3 shadow-lg"
                  style={{ backgroundColor: profile.color + '20', color: profile.color }}
                >
                  {profile.avatar}
                </div>
                
                {/* Name */}
                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white line-clamp-2">
                  {profile.name}
                </h3>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteProfile(profile.id, e)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title={language === 'de' ? 'Profil löschen' : 'حذف الملف الشخصي'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}

          {/* Add New Profile Button */}
          {canCreateProfile && !showCreateForm && (
            <Card
              className="aspect-square cursor-pointer hover:scale-105 transition-transform duration-200 border-4 border-dashed border-gray-300 dark:border-gray-600"
              onClick={() => setShowCreateForm(true)}
            >
              <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3">
                  <Plus className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
                  {language === 'de' ? 'Neues Profil' : 'ملف جديد'}
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Create Profile Form */}
        {showCreateForm && (
          <Card className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
              {language === 'de' ? 'Neues Profil erstellen' : 'إنشاء ملف شخصي جديد'}
            </h2>
            
            <form onSubmit={handleCreateProfile} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'de' ? 'Name' : 'الاسم'}
                </label>
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  maxLength={20}
                  placeholder={language === 'de' ? 'z.B. Ahmed, Fatima...' : 'مثل: أحمد، فاطمة...'}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-colors"
                  required
                />
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  {language === 'de' ? 'Avatar wählen' : 'اختر الصورة الرمزية'}
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {PROFILE_AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`aspect-square text-3xl rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedAvatar === avatar
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  {language === 'de' ? 'Farbe wählen' : 'اختر اللون'}
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {PROFILE_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`aspect-square rounded-lg border-4 transition-all hover:scale-110 ${
                        selectedColor === color
                          ? 'border-gray-900 dark:border-white'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300 text-center">
                  {language === 'de' ? 'Vorschau' : 'معاينة'}
                </p>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-lg mb-3"
                      style={{ backgroundColor: selectedColor + '20', color: selectedColor }}
                    >
                      {selectedAvatar}
                    </div>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {newProfileName || (language === 'de' ? 'Dein Name' : 'اسمك')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewProfileName('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  {language === 'de' ? 'Abbrechen' : 'إلغاء'}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={!newProfileName.trim()}
                >
                  {language === 'de' ? 'Profil erstellen' : 'إنشاء الملف الشخصي'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Info Text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          {language === 'de' 
            ? `Du kannst bis zu ${MAX_PROFILES} Profile erstellen. Jedes Profil hat seinen eigenen Fortschritt.`
            : `يمكنك إنشاء ما يصل إلى ${MAX_PROFILES} ملفات شخصية. كل ملف شخصي له تقدمه الخاص.`}
        </p>
      </div>
    </div>
  );
}
