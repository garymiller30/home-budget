import { splitFloatNumber } from "../../lib";
import s from "./BudgetNumber.module.css";
export default function BudgetNumber({ budget }) {
  const [budgetMain, budgetKop] = splitFloatNumber(budget);

  return (
    <p className={s.budgetMain}>
      {budgetMain}
      <span className={s.budgetKop}>{budgetKop}</span>
    </p>
  );
}
