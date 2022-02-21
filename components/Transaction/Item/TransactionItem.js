import s from "./TransactionItem.module.css";

export default function TransactionItem({ transaction }) {
  return (
    // <li>
    //   {transaction.description}: {transaction.amount}₴
    // </li>
    <tr className={s.tr}>
      <td>{transaction.description}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
}
