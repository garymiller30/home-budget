import TransactionItem from "../Item/TransactionItem";
import s from "./TransactionList.module.css";

export default function TransactionList({ transactions }) {
  return (
    <ul className={s.list}>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction._id}
          transaction={transaction}
        ></TransactionItem>
      ))}
    </ul>
  );
}
