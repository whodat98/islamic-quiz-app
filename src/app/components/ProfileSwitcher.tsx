import { useNavigate } from 'react-router';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../i18n';
import { Button } from './ui/button';
import { UserCircle, Users } from 'lucide-react';

export function ProfileSwitcher() {
  const navigate = useNavigate();
  const { currentProfile, clearCurrentProfile } = useProfile();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleSwitchProfile = () => {
    clearCurrentProfile();
    navigate('/profiles');
  };

  if (!currentProfile) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Current Profile Display */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 shadow-sm" 
           style={{ borderColor: currentProfile.color }}>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: currentProfile.color + '20', color: currentProfile.color }}
        >
          {currentProfile.avatar}
        </div>
        <span className="font-medium text-sm text-gray-900 dark:text-white hidden sm:inline">
          {currentProfile.name}
        </span>
      </div>

      {/* Switch Button */}
      <Button
        onClick={handleSwitchProfile}
        variant="outline"
        size="sm"
        className="gap-2"
        title={language === 'de' ? 'Profil wechseln' : 'تبديل الملف الشخصي'}
      >
        <Users className="w-4 h-4" />
        <span className="hidden sm:inline">
          {language === 'de' ? 'Wechseln' : 'تبديل'}
        </span>
      </Button>
    </div>
  );
}
