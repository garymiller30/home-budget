export default function TransactionItem({ transaction }) {
  return (
    // <li>
    //   {transaction.description}: {transaction.amount}₴
    // </li>
    <tr>
      <td>{transaction.description}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
}
