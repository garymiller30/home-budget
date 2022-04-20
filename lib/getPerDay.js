import { daysInMonth } from "../lib";

export function getPerDay(budget, date) {
  //const days = daysInMonth(date.year, date.month) - new Date().getDate() + 1;
  const days = 30;
  return (budget / days).toFixed(2);
}
