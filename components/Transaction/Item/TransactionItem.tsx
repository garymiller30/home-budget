import s from "./TransactionItem.module.css";
// import DeleteIcon from "@mui/icons-material/Delete";
import { iTransaction } from "../../../interfaces/iTransaction";
// import { IconButton, Tooltip } from "@mui/material";

interface TransactionItemProps {
  transaction: iTransaction;
  onDelete: (transaction: iTransaction) => void;
}

export default function TransactionItem({
  transaction,
  onDelete,
}: TransactionItemProps) {
  return null;
  // (
  //   <li className={s.tr}>
  //     <div>
  //       <p className={s.description}>{transaction.description}</p>
  //       {transaction.comment ? (
  //         <p className={s.comment}>{transaction.comment}</p>
  //       ) : null}
  //     </div>

  //     <div className={s.amount_container}>
  //       <p className={s.amount}>{Number(transaction.amount).toFixed(2)}</p>
  //       <div className={s.button}>
  //         <Tooltip title="delete">
  //           <IconButton size="small" onClick={() => onDelete(transaction)}>
  //             <DeleteIcon fontSize="small" sx={{ padding: 0, margin: 0 }} />
  //           </IconButton>
  //         </Tooltip>
  //       </div>
  //     </div>
  //   </li>
  // );
}
