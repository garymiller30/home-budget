import s from "./BottomNavigation.module.css";
import { AddDebitBtn, AddCreditBtn, ChartBtn } from "../index";

export default function BottomNavigation({
  date,
  OnClickDebit,
  OnClickCredit,
}) {
  return (
    <div className={s.container}>
      <AddDebitBtn onClick={OnClickDebit} />
      <ChartBtn sx={{ color: "success" }} date={date} />
      <AddCreditBtn onClick={OnClickCredit} />
    </div>
  );
}
