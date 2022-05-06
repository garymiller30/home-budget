import Transaction from "../model/transaction";

export function getSum(arr: Transaction[]): number {
  const newLocal: number = (arr
    .reduce((sum: number, transaction: Transaction) => sum + Number(transaction.amount), 0))
    .toFixed(2) as any
  return newLocal;
}
