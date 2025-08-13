export const networkColors = {
  // L1 / Native networks
  BTC: '#FFF0BA', // Bitcoin
  ETH: '#D6E5FFB2', // Ethereum
  TRX: '#FFB2A5', // Tron
  TON: '#BADEFF', // Toncoin
  DOGE: '#FFF69B', // Dogecoin
  LTC: '#C4D9FF', // Litecoin
  XMR: '#FED2D1', // Monero
  XRP: '#E0E0E0', // XRP (brand is near-black)
  EOS: '#C7F0ED', // EOS
  BEP20: '#FFE7A6',
  // Others
  SUI: '#CBEDFF', // Sui
};

/**
 * Return readable text color (dark or light) depending on background color brightness
 */
export function getReadableTextColor(backgroundColor: string | undefined): string {
  if (!backgroundColor) return '#1B1B1B';

  const parseRgba = (color: string): { r: number; g: number; b: number } | null => {
    // rgba(r,g,b,a)
    let match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
    if (match) {
      return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
    }
    // #rrggbb
    match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      };
    }
    return null;
  };

  const rgb = parseRgba(backgroundColor);
  if (!rgb) return '#1B1B1B';

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 155 ? '#1B1B1B' : '#FFFFFF';
}

/**
 * Optional explicit text color map from Figma (overrides auto-contrast)
 */
export const networkTextColors: Record<string, string> = {
  // Example overrides from Figma tokens (adjust as needed)
  BTC: '#DA9832',
  ETH: '#3652A3',
  TRX: '#D66C5E',
  TON: '#6A8EC3',
  DOGE: '#CCB054',
  LTC: '#7E93B9',
  XMR: '#913B39',
  XRP: '#3A3A3A',
  EOS: '#81AAA7',
  SUI: '#39799C',
  BEP20: '#AF9756',
};

export const defaultNetworkTextColor = '#39799C';

/**
 * Get text color for a given network label using Figma override map, then auto-contrast, then default
 */
export function getNetworkTextColor(networkTitle?: string): string {
  const key = networkTitle?.toUpperCase() as keyof typeof networkTextColors | undefined;
  return key && networkTextColors[key] ? networkTextColors[key] : defaultNetworkTextColor;
}
