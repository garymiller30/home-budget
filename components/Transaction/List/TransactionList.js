import { useState } from "react";
import TransactionItem from "../Item/TransactionItem";
import s from "./TransactionList.module.css";

export default function TransactionList({ transactions }) {
  const [trans, setTrans] = useState(transactions);

  function onDeleteHandler(id) {
    setTrans(trans.filter((t) => t._id !== id));
  }
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>description</th>
          <th>₴</th>
        </tr>
      </thead>
      <tbody>
        {trans.map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            onDelete={onDeleteHandler}
          />
        ))}
      </tbody>
    </table>
  );
}
