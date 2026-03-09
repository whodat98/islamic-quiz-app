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

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {language === 'ar' ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">1. مقدمة</h2>
                <p className="text-gray-700 leading-relaxed">
                  نحن في ImanIQ نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام تطبيقنا.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">2. البيانات التي نجمعها</h2>
                <p className="text-gray-700 leading-relaxed mb-3">نقوم بجمع الأنواع التالية من البيانات:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>معلومات الحساب: عنوان البريد الإلكتروني، الاسم، كلمة المرور المشفرة</li>
                  <li>بيانات الاستخدام: تقدم الاختبار، النتائج، الإحصائيات</li>
                  <li>البيانات الفنية: عنوان IP، نوع المتصفح، معلومات الجهاز</li>
                  <li>ملفات تعريف الارتباط وتقنيات التتبع</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">3. كيفية استخدام بياناتك</h2>
                <p className="text-gray-700 leading-relaxed mb-3">نستخدم بياناتك للأغراض التالية:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>توفير وتحسين خدمات التطبيق</li>
                  <li>حفظ تقدمك ونتائجك في الاختبارات</li>
                  <li>إرسال إشعارات مهمة حول التطبيق</li>
                  <li>تحليل استخدام التطبيق لتحسين الأداء</li>
                  <li>عرض إعلانات مخصصة عبر Google AdMob</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">4. Google AdMob والإعلانات</h2>
                <p className="text-gray-700 leading-relaxed">
                  نستخدم Google AdMob لعرض الإعلانات في التطبيق. قد تقوم Google بجمع بيانات معينة لتخصيص الإعلانات. 
                  <a href="https://policies.google.com/privacy" className="text-emerald-600 hover:underline mr-1" target="_blank" rel="noopener noreferrer">سياسة خصوصية Google</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">5. Supabase وتخزين البيانات</h2>
                <p className="text-gray-700 leading-relaxed">
                  نستخدم Supabase لتخزين وإدارة بياناتك بشكل آمن. يتم تشفير جميع البيانات أثناء النقل والتخزين.
                  <a href="https://supabase.com/privacy" className="text-emerald-600 hover:underline mr-1" target="_blank" rel="noopener noreferrer">سياسة خصوصية Supabase</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">6. مشاركة البيانات</h2>
                <p className="text-gray-700 leading-relaxed mb-3">نحن لا نبيع بياناتك الشخصية. قد نشارك البيانات مع:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>مزودي الخدمات (Supabase، Google AdMob)</li>
                  <li>السلطات القانونية عند الضرورة القانونية</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">7. حقوقك</h2>
                <p className="text-gray-700 leading-relaxed mb-3">لديك الحق في:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>الوصول إلى بياناتك الشخصية</li>
                  <li>تصحيح البيانات غير الدقيقة</li>
                  <li>حذف حسابك وبياناتك</li>
                  <li>الاعتراض على معالجة بياناتك</li>
                  <li>تصدير بياناتك</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">8. أمان البيانات</h2>
                <p className="text-gray-700 leading-relaxed">
                  نتخذ تدابير أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو التدمير. ومع ذلك، لا يمكن ضمان أمان نقل البيانات عبر الإنترنت بنسبة 100%.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">9. حقوق الأطفال</h2>
                <p className="text-gray-700 leading-relaxed">
                  تطبيقنا مناسب لجميع الأعمار. لا نجمع عن قصد معلومات شخصية من الأطفال دون سن 13 عامًا دون موافقة الوالدين.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">10. التغييرات على هذه السياسة</h2>
                <p className="text-gray-700 leading-relaxed">
                  قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر السياسة الجديدة في التطبيق.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">11. اتصل بنا</h2>
                <p className="text-gray-700 leading-relaxed mb-2">
                  إذا كانت لديك أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:
                </p>
                <p className="text-emerald-600 font-semibold">البريد الإلكتروني: privacy@imaniq.app</p>
              </section>

              <section className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-600">
                  آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">1. Einleitung</h2>
                <p className="text-gray-700 leading-relaxed">
                  Wir bei ImanIQ respektieren Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen. Diese Datenschutzerklärung erläutert, wie wir Ihre Informationen sammeln, verwenden und schützen, wenn Sie unsere App nutzen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">2. Welche Daten wir sammeln</h2>
                <p className="text-gray-700 leading-relaxed mb-3">Wir sammeln folgende Arten von Daten:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Kontoinformationen: E-Mail-Adresse, Name, verschlüsseltes Passwort</li>
                  <li>Nutzungsdaten: Quiz-Fortschritt, Ergebnisse, Statistiken</li>
                  <li>Technische Daten: IP-Adresse, Browsertyp, Geräteinformationen</li>
                  <li>Cookies und Tracking-Technologien</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">3. Wie wir Ihre Daten verwenden</h2>
                <p className="text-gray-700 leading-relaxed mb-3">Wir verwenden Ihre Daten für folgende Zwecke:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Bereitstellung und Verbesserung der App-Dienste</li>
                  <li>Speicherung Ihres Quiz-Fortschritts und Ihrer Ergebnisse</li>
                  <li>Versand wichtiger App-Benachrichtigungen</li>
                  <li>Analyse der App-Nutzung zur Leistungsverbesserung</li>
                  <li>Anzeige personalisierter Werbung über Google AdMob</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">4. Google AdMob und Werbung</h2>
                <p className="text-gray-700 leading-relaxed">
                  Wir verwenden Google AdMob zur Anzeige von Werbung in der App. Google kann bestimmte Daten sammeln, um Anzeigen zu personalisieren. 
                  <a href="https://policies.google.com/privacy" className="text-emerald-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">Googles Datenschutzerklärung</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">5. Supabase und Datenspeicherung</h2>
                <p className="text-gray-700 leading-relaxed">
                  Wir nutzen Supabase zur sicheren Speicherung und Verwaltung Ihrer Daten. Alle Daten werden während der Übertragung und Speicherung verschlüsselt. 
                  <a href="https://supabase.com/privacy" className="text-emerald-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Supabase</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">6. Datenweitergabe</h2>
                <p className="text-gray-700 leading-relaxed mb-3">Wir verkaufen Ihre persönlichen Daten nicht. Wir können Daten teilen mit:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Dienstleistern (Supabase, Google AdMob)</li>
                  <li>Behörden bei gesetzlicher Verpflichtung</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">7. Ihre Rechte</h2>
                <p className="text-gray-700 leading-relaxed mb-3">Sie haben das Recht:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Auf Zugriff auf Ihre persönlichen Daten</li>
                  <li>Auf Berichtigung unrichtiger Daten</li>
                  <li>Auf Löschung Ihres Kontos und Ihrer Daten</li>
                  <li>Auf Widerspruch gegen die Verarbeitung Ihrer Daten</li>
                  <li>Auf Export Ihrer Daten</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">8. Datensicherheit</h2>
                <p className="text-gray-700 leading-relaxed">
                  Wir ergreifen angemessene Sicherheitsmaßnahmen zum Schutz Ihrer Daten vor unbefugtem Zugriff, Verlust oder Zerstörung. Allerdings kann die Sicherheit der Datenübertragung über das Internet nicht zu 100% garantiert werden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">9. Kinder</h2>
                <p className="text-gray-700 leading-relaxed">
                  Unsere App ist für alle Altersgruppen geeignet. Wir sammeln wissentlich keine persönlichen Informationen von Kindern unter 13 Jahren ohne Zustimmung der Eltern.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">10. Änderungen dieser Richtlinie</h2>
                <p className="text-gray-700 leading-relaxed">
                  Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen durch Veröffentlichung der neuen Richtlinie in der App informieren.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">11. Kontakt</h2>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter:
                </p>
                <p className="text-emerald-600 font-semibold">E-Mail: privacy@imaniq.app</p>
              </section>

              <section className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-600">
                  Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
