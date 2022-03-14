import { getSum } from "../lib/transaction";
export function getBudget(debit, credit) {
  return getSum(debit) - getSum(credit);
}
