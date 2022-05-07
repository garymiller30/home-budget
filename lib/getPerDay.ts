import { daysInMonth } from ".";
import { iDate } from "../interfaces/iDate";

export function getPerDay(budget: number, date: iDate): number {
  //const days = daysInMonth(date.year, date.month) - new Date().getDate() + 1;
  const days = 30;
  return (budget / days).toFixed(2) as any;
}
