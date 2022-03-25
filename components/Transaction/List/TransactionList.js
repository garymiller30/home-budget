import TransactionGroup from "../Group/TransactionGroup";
import groupTransactionsByDay from "../../../lib/groupTransactionsByDay";
import s from "./TransactionList.module.css";
import TransactionItem from "../Item/TransactionItem";
import { Fragment } from "react";
export default function TransactionList({ transactions, onDelete }) {
  const grouped = groupTransactionsByDay(transactions);
  const keys = Object.keys(grouped).sort((a, b) => Number(a) < Number(b));

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>description</th>
          <th>₴</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((k) => (
          <Fragment key={k}>
            <TransactionGroup title={k} />
            {grouped[k].map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
                onDelete={onDelete}
              />
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
