// Mixpanel utility functions
interface MixpanelInstance {
  track: (eventName: string, properties?: Record<string, unknown>) => void;
  track_pageview: (properties?: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    mixpanel?: MixpanelInstance;
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.mixpanel) {
    window.mixpanel.track(eventName, properties);
  }
};

export const trackPageView = (pageName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.mixpanel) {
    window.mixpanel.track_pageview({
      page: pageName,
      ...properties,
    });
    window.mixpanel.track('Page View', {
      page: pageName,
      ...properties,
    });
  }
};

