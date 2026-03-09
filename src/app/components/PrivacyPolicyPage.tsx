import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-emerald-600" />
          </button>
          <h1 className="text-3xl font-bold text-emerald-900">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Datenschutzerklärung'}
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-700">
            {language === 'ar' 
              ? 'نحن في ImanIQ نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.' 
              : 'Wir bei ImanIQ respektieren Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen.'}
          </p>
        </div>
      </div>
    </div>
  );
}
