import s from "./Budget.module.css";
import { DateNavigator } from "..";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Tooltip from "@mui/material/Tooltip";
import BudgetNumber from "./BudgetNumber";
import { iDate } from "../../interfaces/iDate";

interface BudgetProps {
  budget: number;
  date: iDate;
  perDay: number;
  onChangeDate: (date: iDate) => void;
}

export default function Budget({
  budget,
  date,
  perDay = 0,
  onChangeDate,
}: BudgetProps) {
  const perDayInt = Math.trunc(perDay);
  return (
    <section className={s.section}>
      <DateNavigator date={date} onChangeDate={onChangeDate} />
      <div className={s.perDayContainer}>
        <p className={s.perDayTitle}>per day/30d</p>
        <p className={s.perDayBox}>
          <span className={s.perDayValue}>{perDayInt}</span>
        </p>
      </div>
      <Tooltip title="budget">
        <div className={s.budget}>
          <CreditCardIcon />
          <BudgetNumber budget={budget} />
        </div>
      </Tooltip>
    </section>
  );
}
