import s from "./TransactionItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
//import Image from "next/image";
import fetch from "isomorphic-unfetch";

export default function TransactionItem({ transaction, onDelete }) {
  async function deleteHandler(id) {
    const response = await fetch("/api/transaction", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    const r = await response.json();
    if (r) onDelete(r._id);
    //TODO: show error
  }

  return (
    <li className={s.tr}>
      <div>
        <p className={s.description}>{transaction.description}</p>
        {transaction.comment ? (
          <p className={s.comment}>{transaction.comment}</p>
        ) : null}
      </div>

      <div className={s.amount_container}>
        <p className={s.amount}>{Number(transaction.amount).toFixed(2)}</p>

        <button
          width={18}
          height={18}
          className={s.button}
          onClick={() => deleteHandler(transaction._id)}
        >
          <DeleteIcon
            fontSize="small"
            color="red"
            sx={{ padding: 0, margin: 0 }}
          />
        </button>
      </div>
    </li>
  );
}
