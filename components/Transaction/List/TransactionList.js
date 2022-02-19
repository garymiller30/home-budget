import TransactionItem from "../Item/TransactionItem";

export default function TransactionList({ transactions }) {
  return (
    <ul>
      {transactions.map((transaction) => (
        <TransactionItem transaction={transaction}></TransactionItem>
      ))}
    </ul>
  );
}
