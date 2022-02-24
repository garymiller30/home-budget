import s from "./BottomNavigation.module.css";
import { AddDebitBtn, AddCreditBtn } from "../index";

export default function BottomNavigation({ OnClickDebit, OnClickCredit }) {
  return (
    <div className={s.container}>
      <AddDebitBtn onClick={OnClickDebit} />
      <AddCreditBtn onClick={OnClickCredit} />
    </div>
  );
}
