import { useEffect } from 'react';

interface PageTitleProps {
  title?: string;
}

export function PageTitle({ title = 'Islamisches Quiz' }: PageTitleProps) {
  useEffect(() => {
    document.title = `🌙 ${title}`;
  }, [title]);

  return null;
}
