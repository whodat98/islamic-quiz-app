import { Outlet, useLocation, useNavigate } from 'react-router';
import { PWAInstallPrompt } from './PWAInstallPrompt';
import { OfflineIndicator } from './OfflineIndicator';
import { NotificationPermission } from './NotificationPermission';
import { useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentProfile } = useProfile();

  // Profile check for ALL protected routes
  // Public routes (/privacy, /about) are now OUTSIDE this layout
  useEffect(() => {
    // Allow /login, /signup, /profiles without redirect
    const publicPaths = ['/login', '/signup', '/profiles'];
    const isPublicPath = publicPaths.some(path => location.pathname.startsWith(path));
    
    if (!isPublicPath && !currentProfile) {
      navigate('/profiles');
    }
  }, [currentProfile, location.pathname, navigate]);

  return (
    <>
      <Outlet />
      <PWAInstallPrompt />
      <OfflineIndicator />
      <NotificationPermission />
    </>
  );
}
}