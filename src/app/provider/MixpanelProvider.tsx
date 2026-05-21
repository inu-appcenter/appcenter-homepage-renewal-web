'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Mixpanel } from 'shared/utils/mixpanel';

export function MixpanelInit() {
  const pathname = usePathname();

  useEffect(() => {
    Mixpanel.track('Page View', {
      path: pathname
    });
  }, [pathname]);

  return null;
}
