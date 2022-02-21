import s from "./Budget.module.css";
export default function Budget({ budget }) {
  return (
    <section className={s.budget}>
      budget: <span>{Number(budget.toFixed(2))}</span> ₴
    </section>
  );
}
