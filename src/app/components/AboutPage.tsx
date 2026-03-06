import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Heart, BookOpen, Users, Shield, Code, Award } from 'lucide-react';

export function AboutPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Über die App',
      version: 'Version 1.0.0',
      developer: 'Entwickler',
      copyright: 'Copyright',
      allRightsReserved: 'Alle Rechte vorbehalten',
      madeWith: 'Entwickelt mit',
      forUmmah: 'für die Ummah',
      description: 'Eine islamische Quiz-App mit 300 schweren Fragen in 6 Kategorien: Quran, Hadith, Fiqh, Seerah, islamische Geschichte und Aqidah.',
      features: 'Features',
      feature1: '300 anspruchsvolle Fragen',
      feature2: 'Quizduell-Modus',
      feature3: 'Mehrsprachig (Deutsch/Arabisch)',
      feature4: 'Offline verfügbar (PWA)',
      feature5: 'Bis zu 5 Profile pro Gerät',
      feature6: '100% islamische Inhalte',
      mission: 'Unsere Mission',
      missionText: 'Diese App wurde entwickelt, um Muslimen zu helfen, ihr Wissen über den Islam zu vertiefen und zu testen. Alle Inhalte sind zu 100% islamisch und basieren auf authentischen Quellen.',
      disclaimer: 'Wichtiger Hinweis',
      disclaimerText: 'Diese App dient ausschließlich Bildungszwecken. Für verbindliche religiöse Auskünfte konsultieren Sie bitte qualifizierte Gelehrte.',
      privacy: 'Datenschutz',
      privacyText: 'Ihre Daten werden sicher gespeichert und niemals an Dritte weitergegeben. Die App kann komplett ohne Anmeldung genutzt werden.',
      back: 'Zurück',
    },
    ar: {
      title: 'حول التطبيق',
      version: 'الإصدار 1.0.0',
      developer: 'المطور',
      copyright: 'حقوق النشر',
      allRightsReserved: 'جميع الحقوق محفوظة',
      madeWith: 'تم التطوير بـ',
      forUmmah: 'للأمة',
      description: 'تطبيق اختبار إسلامي يحتوي على 300 سؤال صعب في 6 فئات: القرآن، الحديث، الفقه، السيرة، التاريخ الإسلامي والعقيدة.',
      features: 'المميزات',
      feature1: '300 سؤال متقدم',
      feature2: 'وضع المبارزة',
      feature3: 'متعدد اللغات (ألماني/عربي)',
      feature4: 'متاح دون اتصال (PWA)',
      feature5: 'حتى 5 ملفات شخصية لكل جهاز',
      feature6: '100% محتوى إسلامي',
      mission: 'مهمتنا',
      missionText: 'تم تطوير هذا التطبيق لمساعدة المسلمين على تعميق واختبار معرفتهم بالإسلام. جميع المحتويات إسلامية بنسبة 100% وتستند إلى مصادر موثوقة.',
      disclaimer: 'ملاحظة مهمة',
      disclaimerText: 'هذا التطبيق للأغراض التعليمية فقط. للحصول على فتاوى ملزمة، يرجى استشارة علماء مؤهلين.',
      privacy: 'الخصوصية',
      privacyText: 'يتم تخزين بياناتك بشكل آمن ولن يتم مشاركتها مع أطراف ثالثة. يمكن استخدام التطبيق بالكامل دون تسجيل.',
      back: 'رجوع',
    },
  };

  const t = content[language];
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              {t.back}
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* App Logo & Version */}
        <Card className="p-8 mb-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Islamic Quiz
          </h2>
          <p className="text-gray-600 mb-4">{t.description}</p>
          <p className="text-sm text-gray-500">{t.version}</p>
        </Card>

        {/* Copyright */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Code className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{t.developer}</h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Ayoub Bezoui
              </p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              {t.copyright} © 2026 Ayoub Bezoui. {t.allRightsReserved}
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
              <span>{t.madeWith}</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{t.forUmmah}</span>
              <span className="ml-2">🕌</span>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            {t.features}
          </h3>
          <ul className="space-y-3">
            {[t.feature1, t.feature2, t.feature3, t.feature4, t.feature5, t.feature6].map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Mission */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            {t.mission}
          </h3>
          <p className="text-gray-700 leading-relaxed">{t.missionText}</p>
        </Card>

        {/* Privacy */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            {t.privacy}
          </h3>
          <p className="text-gray-700 leading-relaxed">{t.privacyText}</p>
        </Card>

        {/* Disclaimer */}
        <Card className="p-6 bg-amber-50 border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-3">⚠️ {t.disclaimer}</h3>
          <p className="text-amber-800 leading-relaxed">{t.disclaimerText}</p>
        </Card>
      </div>
    </div>
  );
}
