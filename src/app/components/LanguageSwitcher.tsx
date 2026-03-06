import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      onClick={() => setLanguage(language === 'de' ? 'ar' : 'de')}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === 'de' ? 'عربي' : 'Deutsch'}
    </Button>
  );
}
