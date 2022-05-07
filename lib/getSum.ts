import { iTransaction } from "../interfaces/iTransaction";

export function getSum(arr: iTransaction[]): number {
  const newLocal: number = (arr
    .reduce((sum: number, transaction: iTransaction) => sum + Number(transaction.amount), 0))
    .toFixed(2) as any
  return newLocal;
}
