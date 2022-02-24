import s from "./BottomNavigation.module.css";
import { AddDebitBtn, AddCreditBtn, ChartBtn } from "../index";

export default function BottomNavigation({ OnClickDebit, OnClickCredit }) {
  return (
    <div className={s.container}>
      <AddDebitBtn onClick={OnClickDebit} />
      <ChartBtn sx={{ color: "success" }} />
      <AddCreditBtn onClick={OnClickCredit} />
    </div>
  );
}
