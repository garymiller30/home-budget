import s from "./BudgetNumber.module.css";
export default function BudgetNumber({ budget }) {
  const budgetMain = Math.trunc(budget);
  const budgetKop = (budget % 1).toFixed(2) * 100;
  return (
    <p className={s.budgetMain}>
      {budgetMain}
      <span className={s.budgetKop}>{budgetKop}</span>₴
    </p>
  );
}
