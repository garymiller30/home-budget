import s from "./TransactionGroup.module.css";
import { useMemo } from "react";
import { getDataTotalAmount } from "../../../lib";

export default function TransactionGroup({ title, transactions }) {
  const sum = useMemo(() => getDataTotalAmount(transactions), [transactions]);

  return (
    <li className={s.tr}>
      <p className={s.title}>{title}</p>
      <p className={s.sum}>{sum}</p>
    </li>
  );
}
