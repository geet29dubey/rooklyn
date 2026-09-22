/** Accept international numbers and Spanish local numbers, with common separators. */
export function isValidPhone(value: string): boolean {
  const phone = value.trim();
  if (!/^\+?[\d\s().-]+$/.test(phone)) return false;

  let depth = 0;
  for (const char of phone) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    if (depth < 0 || depth > 1) return false;
  }
  if (depth !== 0) return false;

  const digits = phone.replace(/\D/g, "");
  if (phone.startsWith("+")) return /^[1-9]\d{7,14}$/.test(digits);
  return /^\d{9}$/.test(digits) || /^34\d{9}$/.test(digits);
}

export function toE164(value: string): string {
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");
  return `+${phone.startsWith("+") || digits.startsWith("34") ? "" : "34"}${digits}`;
}
