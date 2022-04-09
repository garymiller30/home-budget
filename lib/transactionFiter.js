export function transactionFiter(transactions = [], type) {
  return transactions.filter((transaction) => transaction.type === type);
}
