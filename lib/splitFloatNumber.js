export function splitFloatNumber(number) {
  const main = Math.trunc(number);
  const kop = Math.trunc((number % 1).toFixed(2) * 100);
  return [main, kop];
}
