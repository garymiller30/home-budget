export default function TransactionItem({ transaction }) {
  return (
    <li>
      {transaction.description}: {transaction.amount}₴
    </li>
  );
}
