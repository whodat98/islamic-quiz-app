import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { Dashboard } from './components/Dashboard';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { PaymentPage } from './components/PaymentPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ProfileSelection } from './components/ProfileSelection';
import { DuellWaitingRoom } from './components/DuellWaitingRoom';
import { DuellPlayPage } from './components/DuellPlayPage';
import { DuellResultPage } from './components/DuellResultPage';
import { AboutPage } from './components/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'profiles', element: <ProfileSelection /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'quiz/:category', element: <QuizPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'payment', element: <PaymentPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'duell/:duellId/waiting', element: <DuellWaitingRoom /> },
      { path: 'duell/:duellId/play', element: <DuellPlayPage /> },
      { path: 'duell/:duellId/result', element: <DuellResultPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);