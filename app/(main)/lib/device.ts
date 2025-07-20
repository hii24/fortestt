export function isMobile(userAgent: string) {
  return /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
    userAgent
  );
}

export function getScreenSize(userAgent: string, width?: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  // Если мобильное устройство и ширина не указана, считаем xs
  if (isMobile(userAgent) && !width) {
    return 'xs';
  }

  // Если ширина указана, определяем размер экрана
  if (width) {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1600) return 'xl';
    return '2xl';
  }

  // По умолчанию для десктопа
  return 'lg';
}
