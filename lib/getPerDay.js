import { daysInMonth } from "../lib/dateLib";

export function getPerDay(budget, date) {
  const days = daysInMonth(date.year, date.month) - new Date().getDate() + 1;
  return (budget / days).toFixed(2);
}