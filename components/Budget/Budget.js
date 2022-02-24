import s from "./Budget.module.css";
import { DateNavigator } from "../../components";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Tooltip from "@mui/material/Tooltip";

export default function Budget({ budget, date, perDay = 0, onChangeDate }) {
  return (
    <section className={s.section}>
      <DateNavigator date={date} onChangeDate={onChangeDate} />
      <div className={s.perDayContainer}>
        <p className={s.perDayTitle}>per day</p>
        <p className={s.perDayBox}>
          <span className={s.perDayValue}>{perDay}</span> ₴
        </p>
      </div>
      <Tooltip title="budget">
        <p className={s.budget}>
          <CreditCardIcon /> <span>{Number(budget.toFixed(2))}</span>₴
        </p>
      </Tooltip>
    </section>
  );
}
