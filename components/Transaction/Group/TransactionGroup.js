import s from "./TransactionGroup.module.css";
import { useMemo } from "react";
import { getDataTotalAmount } from "../../../lib/utils";

export default function TransactionGroup({ title, transactions }) {
  const sum = useMemo(() => getDataTotalAmount(transactions), [transactions]);

  return (
    <tr className={s.tr}>
      <td className={s.title}>{title}</td>
      <td className={s.sum}>{sum}</td>
    </tr>
  );
}
