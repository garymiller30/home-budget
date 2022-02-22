import s from "./Budget.module.css";
import { DateNavigator } from "../../components";
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
      <p className={s.budget}>
        budget: <span>{Number(budget.toFixed(2))}</span>₴
      </p>
    </section>
  );
}
