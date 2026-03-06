import { useEffect } from 'react';
import { generateIcon } from '../utils/generateIcon';

export function DynamicIcons() {
  useEffect(() => {
    console.log('🎨 DynamicIcons: Starting icon generation...');
    
    // Generate favicon immediately
    const faviconUrl = generateIcon(32);
    
    if (!faviconUrl) {
      console.error('❌ Failed to generate icon');
      return;
    }
    
    console.log('✅ Icon generated, updating favicon...');
    
    // Remove all existing favicons
    const existingIcons = document.querySelectorAll('link[rel*="icon"]');
    existingIcons.forEach(icon => {
      console.log('🗑️ Removing old icon:', icon.getAttribute('href'));
      icon.remove();
    });
    
    // Add new favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
    
    // Add apple-touch-icon
    const appleFavicon = document.createElement('link');
    appleFavicon.rel = 'apple-touch-icon';
    appleFavicon.href = generateIcon(180);
    document.head.appendChild(appleFavicon);
    
    console.log('✅ Favicon updated! URL:', faviconUrl.substring(0, 50) + '...');
    
    // Force browser to refresh favicon
    setTimeout(() => {
      const links = document.querySelectorAll('link[rel="icon"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          link.setAttribute('href', href + '?v=' + Date.now());
        }
      });
      console.log('🔄 Favicon cache busted!');
    }, 100);
  }, []);
  
  return null;
}