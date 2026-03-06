import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProfileProvider } from './context/ProfileContext';
import { DuellProvider } from './context/DuellContext';
import { useEffect } from 'react';
import { initAnalytics } from './utils/analytics';

export default function App() {
  useEffect(() => {
    // Initialize analytics on app load
    initAnalytics();
  }, []);

  return (
    <LanguageProvider>
      <ProfileProvider>
        <DuellProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </DuellProvider>
      </ProfileProvider>
    </LanguageProvider>
  );
}