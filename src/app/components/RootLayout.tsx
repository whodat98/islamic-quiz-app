import { Outlet } from 'react-router';
import { PWAInstallPrompt } from './PWAInstallPrompt';
import { OfflineIndicator } from './OfflineIndicator';
import { NotificationPermission } from './NotificationPermission';

export function RootLayout() {
  return (
    <>
      <Outlet />
      <PWAInstallPrompt />
      <OfflineIndicator />
      <NotificationPermission />
    </>
  );
}