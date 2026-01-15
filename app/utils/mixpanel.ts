// Mixpanel utility functions
interface MixpanelInstance {
  track: (eventName: string, properties?: Record<string, unknown>) => void;
  track_pageview?: (properties?: Record<string, unknown>) => void;
  __loaded?: boolean;
}

declare global {
  interface Window {
    mixpanel?: MixpanelInstance;
  }
}

// Check if Mixpanel is properly initialized
const isMixpanelReady = (): boolean => {
  if (typeof window === 'undefined') return false;

  return !!(
    window.mixpanel &&
    typeof window.mixpanel.track === 'function' &&
    window.mixpanel.__loaded !== false
  );
};

// Wait for Mixpanel to be ready with timeout
const waitForMixpanel = (timeout = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isMixpanelReady()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isMixpanelReady()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
};

export const trackEvent = async (eventName: string, properties?: Record<string, unknown>) => {
  const ready = await waitForMixpanel();
  if (ready && window.mixpanel) {
    try {
      window.mixpanel.track(eventName, properties);
    } catch (error) {
      console.warn('Mixpanel trackEvent error:', error);
    }
  }
};

export const trackPageView = async (pageName: string, properties?: Record<string, unknown>) => {
  const ready = await waitForMixpanel();
  if (ready && window.mixpanel) {
    try {
      // Use the standard track method instead of track_pageview
      window.mixpanel.track('Page View', {
        page: pageName,
        ...properties,
      });
    } catch (error) {
      console.warn('Mixpanel trackPageView error:', error);
    }
  }
};

