export function calcProportion(
  mul1: number,
  mul2: number,
  divider: number
): number {
  return Math.round((mul1 * mul2) / divider);
}
