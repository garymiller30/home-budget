import s from "./Budget.module.css";
import { DateNavigator } from "../../components";
export default function Budget({ budget, date, onChangeDate }) {
  return (
    <section className={s.section}>
      <DateNavigator date={date} onChangeDate={onChangeDate} />
      <p className={s.budget}>
        budget: <span>{Number(budget.toFixed(2))}</span>₴
      </p>
    </section>
  );
}
