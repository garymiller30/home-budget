import s from "./BottomNavigation.module.css";
import { AddDebitBtn, AddCreditBtn, ChartBtn } from "../index";
import { iDate } from "../../interfaces/iDate";

interface BottomNavigationProps {
  date: iDate;
  OnClickDebit: () => void;
  OnClickCredit: () => void;
}

export default function BottomNavigation({
  date,
  OnClickDebit,
  OnClickCredit,
}: BottomNavigationProps) {
  return (
    <div className={s.container}>
      <AddDebitBtn onClick={OnClickDebit} />
      <ChartBtn sx={{ color: "success" }} date={date} />
      <AddCreditBtn onClick={OnClickCredit} />
    </div>
  );
}
