import TransactionItem from "../Item/TransactionItem";
import s from "./TransactionList.module.css";

export default function TransactionList({ transactions }) {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>description</th>
          <th>₴</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction._id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
}
