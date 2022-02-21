import s from "./TransactionItem.module.css";
import Image from "next/image";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

export default function TransactionItem({ transaction, onDelete }) {
  async function deleteHandler(id) {
    const response = await fetch("/api/transaction", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    await response.json();
    onDelete(id);
    //Router.push("/");
  }

  return (
    <tr className={s.tr}>
      <td>{transaction.description}</td>
      <td className={s.amount}>
        {Number(transaction.amount).toFixed(2)}
        <button
          className={s.button}
          onClick={() => deleteHandler(transaction._id)}
        >
          <Image src="/delete.svg" width={18} height={18} />
        </button>
      </td>
    </tr>
  );
}
