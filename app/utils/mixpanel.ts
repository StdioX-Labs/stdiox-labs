// Mixpanel is loaded once the page is idle so its SDK stays off the critical path. The async-recorder build
// fetches the session-replay recorder from Mixpanel's CDN only when recording starts, instead of bundling it.
// Events tracked before the SDK is ready are queued on the promise and sent once it loads.
type MixpanelClient = typeof import('mixpanel-browser/dist/mixpanel-with-async-recorder.cjs').default;

let client: Promise<MixpanelClient> | null = null;

const loadMixpanel = () => {
  if (!client) {
    client = new Promise((resolve, reject) => {
      const start = () => {
        import('mixpanel-browser/dist/mixpanel-with-async-recorder.cjs')
          .then(({ default: mixpanel }) => {
            mixpanel.init('23254066d6d367be39a750652a3d8fe8', {
              autocapture: true,
              record_sessions_percent: 100,
              api_host: 'https://api-eu.mixpanel.com',
            });
            resolve(mixpanel);
          })
          .catch(reject);
      };
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(start, { timeout: 4000 });
      } else {
        setTimeout(start, 2000);
      }
    });
  }
  return client;
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    loadMixpanel()
      .then((mixpanel) => mixpanel.track(eventName, properties))
      .catch((error) => console.warn('Mixpanel trackEvent error:', error));
  }
};

// Track page views
export const trackPageView = (pageName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    loadMixpanel()
      .then((mixpanel) =>
        mixpanel.track('Page View', {
          page: pageName,
          ...properties,
        }),
      )
      .catch((error) => console.warn('Mixpanel trackPageView error:', error));
  }
};
