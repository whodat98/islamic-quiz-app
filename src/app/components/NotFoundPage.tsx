import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Home, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function NotFoundPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    de: {
      title: '404',
      heading: 'Seite nicht gefunden',
      message: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
      button: 'Zurück zum Dashboard',
    },
    ar: {
      title: '404',
      heading: 'الصفحة غير موجودة',
      message: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      button: 'العودة إلى لوحة التحكم',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-orange-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-gray-800">{t.title}</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{t.heading}</h2>
        <p className="text-gray-600 mb-8">
          {t.message}
        </p>
        
        <Button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2"
          size="lg"
        >
          <Home className="h-5 w-5" />
          {t.button}
        </Button>
      </Card>
    </div>
  );
}
