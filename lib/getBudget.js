import { getSum } from "./";
export function getBudget(debit, credit) {
  return getSum(debit) - getSum(credit);
}
