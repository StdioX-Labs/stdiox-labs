// Import Mixpanel SDK
import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
if (typeof window !== 'undefined') {
  mixpanel.init('23254066d6d367be39a750652a3d8fe8', {
    autocapture: true,
    record_sessions_percent: 100,
    api_host: 'https://api-eu.mixpanel.com',
  });
}

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    try {
      mixpanel.track(eventName, properties);
    } catch (error) {
      console.warn('Mixpanel trackEvent error:', error);
    }
  }
};

// Track page views
export const trackPageView = (pageName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    try {
      mixpanel.track('Page View', {
        page: pageName,
        ...properties,
      });
    } catch (error) {
      console.warn('Mixpanel trackPageView error:', error);
    }
  }
};

