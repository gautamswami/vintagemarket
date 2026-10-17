export function formatPrice(lakh) {
  const n = Math.round(Number(lakh) * 10) / 10;
  const body = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return `₹ ${body} L`;
}

export function groupDigits(value) {
  const s = String(Math.max(0, Math.round(Number(value) || 0)));
  if (s.length <= 3) return s;
  let tail = s.slice(-3);
  let head = s.slice(0, -3);
  while (head.length > 2) {
    tail = `${head.slice(-2)},${tail}`;
    head = head.slice(0, -2);
  }
  return `${head},${tail}`;
}

export function formatKm(km) {
  return `${groupDigits(km)} km`;
}

export function padCount(n) {
  return String(n).padStart(2, "0");
}
