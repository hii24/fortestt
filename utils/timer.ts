export function elapsedSince(startIso?: string): string {
  if (!startIso) return '00 : 00 : 00 : 00';

  const start = new Date(startIso);
  let diff = Date.now() - start.getTime(); // мс

  const s = 1_000;
  const m = 60 * s;
  const h = 60 * m;
  const d = 24 * h;

  // const days = Math.floor(diff / d);
  diff %= d;
  diff %= h;
  const minutes = Math.floor(diff / m);
  diff %= m;
  const seconds = Math.floor(diff / s);

  const pad2 = (n: number) => n.toString().padStart(2, '0').slice(-2);

  return `${pad2(minutes)} : ${pad2(seconds)}`;
}

export function timeLeft(secondsLeft: number): string {
  const s = 1;
  const m = 60 * s;
  const h = 60 * m;
  const d = 24 * h;

  let remaining: number = secondsLeft;

  remaining %= d;
  remaining %= h;
  const minutes = Math.floor(remaining / m);
  remaining %= m;
  const seconds = remaining;

  const pad2 = (n: number): string => n.toString().padStart(2, '0');

  return `${pad2(minutes)} : ${pad2(seconds)}`;
}
