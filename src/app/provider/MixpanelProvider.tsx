'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Mixpanel } from 'shared/utils/mixpanel';
import { MIXPANEL_EVENTS } from 'shared/constants/mixpanelEvents';

export function MixpanelInit() {
  const pathname = usePathname();

  useEffect(() => {
    Mixpanel.track(MIXPANEL_EVENTS.PAGE_VIEW, {
      path: pathname
    });
  }, [pathname]);

  return null;
}
