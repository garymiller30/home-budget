export function getSum(arr) {
  return arr.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
}
