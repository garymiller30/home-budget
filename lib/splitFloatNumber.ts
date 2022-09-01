export function splitFloatNumber(number: number): [number, number] {
  const main: number = Math.trunc(number);
  const fix: number = (number % 1).toFixed(2) as any;
  const kop: number = Math.abs(Math.trunc(fix * 100));
  return [main, kop];
}
