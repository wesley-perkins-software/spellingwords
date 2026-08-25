import { isProductionHost } from './isProductionHost';
import { sanitizePageLocation } from './sanitizePageLocation';

const GA_LOADER_SRC = 'https://www.googletagmanager.com/gtag/js?id=';
const GA_INIT_FLAG = '__spellingwordsGaInitialized';

type GtagArgs = [command: string, ...rest: unknown[]];
type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: GtagArgs) => void;
  [GA_INIT_FLAG]?: boolean;
};

/**
 * Loads gtag.js and issues a single sanitized GA4 config call, but only on
 * the exact production host. Guarded so a caller invoking this more than
 * once (e.g. an accidental duplicate render of the analytics component)
 * can never append a second loader script or issue a second init/config
 * call.
 */
export function initGoogleAnalytics(measurementId: string, win: Window = window): void {
  const gaWindow = win as GtagWindow;

  if (gaWindow[GA_INIT_FLAG]) return;
  if (!isProductionHost(gaWindow.location.hostname)) return;

  gaWindow[GA_INIT_FLAG] = true;

  gaWindow.dataLayer = gaWindow.dataLayer || [];
  const dataLayer = gaWindow.dataLayer;
  function gtag(...args: GtagArgs): void {
    dataLayer.push(args);
  }
  gaWindow.gtag = gtag;

  const script = gaWindow.document.createElement('script');
  script.async = true;
  script.src = `${GA_LOADER_SRC}${measurementId}`;
  gaWindow.document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_location: sanitizePageLocation(gaWindow.location),
  });
}
