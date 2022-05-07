import { getSum } from ".";
import { iTransaction } from "../interfaces/iTransaction";

export function getBudget(debit: iTransaction[], credit: iTransaction[]): number {
  return getSum(debit) - getSum(credit);
}
