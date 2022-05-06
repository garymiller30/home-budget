import { getSum } from ".";
import Transaction from "../model/transaction";
export function getBudget(debit: Transaction[], credit: Transaction[]): number {
  return getSum(debit) - getSum(credit);
}
