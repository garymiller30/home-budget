//отримати кількість днів у місяці. Січень - 1, Лютий - 2 і т.п
export function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
