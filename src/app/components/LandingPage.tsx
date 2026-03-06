import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BookOpen, CheckCircle2, Trophy, BarChart3, Users, Shield } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-800">Islamic Quiz</h1>
            </div>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Quiz starten
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-full mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Islamisches Wissens-Quiz
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Teste und erweitere dein Wissen über den Islam mit 200 sorgfältig ausgewählten Fragen
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6"
              >
                Jetzt starten
              </Button>
              <Button
                onClick={() => navigate('/login')}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                Anmelden
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">300 Fragen</h3>
              <p className="text-gray-600 text-sm">
                Umfassende Fragen aus 6 Kategorien: Quran, Hadith, Fiqh, Seerah, Geschichte und Aqidah
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fortschrittsverfolgung</h3>
              <p className="text-gray-600 text-sm">
                Verfolge deinen Lernfortschritt und sieh deine Verbesserungen in Echtzeit
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Detaillierte Erklärungen</h3>
              <p className="text-gray-600 text-sm">
                Lerne aus jeder Antwort mit ausführlichen und fundierten Erklärungen
              </p>
            </Card>
          </div>

          {/* Pricing Section */}
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-2">Premium Zugang</h2>
                <div className="text-5xl font-bold my-4">4,99€</div>
                <p className="text-emerald-50 mb-6">Einmalzahlung • Lebenslanger Zugriff</p>
                <Button
                  onClick={() => navigate('/signup')}
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100 w-full md:w-auto px-12"
                >
                  Jetzt freischalten
                </Button>
              </div>
              
              <div className="p-8 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">Alle 300 Fragen freigeschaltet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">6 spezialisierte Kategorien</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">Unbegrenzter Zugriff</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">Automatische Fortschrittsspeicherung</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">Sofortiger Start nach Zahlung</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <p className="font-semibold mb-1">Sichere Zahlung</p>
                <p className="text-sm text-gray-600">Über Stripe verschlüsselt</p>
              </div>
              <div>
                <Users className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <p className="font-semibold mb-1">Qualitätsgeprüft</p>
                <p className="text-sm text-gray-600">Von Experten erstellt</p>
              </div>
              <div>
                <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <p className="font-semibold mb-1">Umfassend</p>
                <p className="text-sm text-gray-600">Alle wichtigen Themen</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>Entwickelt für Muslime, die ihr Wissen vertiefen möchten</p>
        </div>
      </div>
    </div>
  );
}