/**
 * Standard UAE Dirham (AED) currency formatter
 * e.g. formatAED(30800) -> "AED 30,800"
 */
export function formatAED(amount: number): string {
  return `AED ${Math.round(amount).toLocaleString('en-US')}`;
}

