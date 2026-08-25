const PRODUCTION_HOSTNAME = 'spellingwords.app';

export function isProductionHost(hostname: string): boolean {
  return hostname === PRODUCTION_HOSTNAME;
}
