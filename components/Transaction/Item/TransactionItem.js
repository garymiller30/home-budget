import s from "./TransactionItem.module.css";

export default function TransactionItem({ transaction }) {
  return (
    // <li>
    //   {transaction.description}: {transaction.amount}₴
    // </li>
    <tr className={s.tr}>
      <td>{transaction.description}</td>
      <td className={s.amount}>{Number(transaction.amount).toFixed(2)}</td>
    </tr>
  );
}
