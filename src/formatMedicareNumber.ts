/** Format MBI-style Medicare number as XXXX-XXX-XXXX while typing. */
export function formatMedicareNumber(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11)
  const parts: string[] = []
  if (cleaned.length > 0) parts.push(cleaned.slice(0, 4))
  if (cleaned.length > 4) parts.push(cleaned.slice(4, 7))
  if (cleaned.length > 7) parts.push(cleaned.slice(7, 11))
  return parts.join('-')
}
