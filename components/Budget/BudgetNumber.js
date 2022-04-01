import { Typography } from "@mui/material";
import s from "./BudgetNumber.module.css";
export default function BudgetNumber({ budget }) {
  const budgetMain = Math.trunc(budget);
  const budgetKop = Math.trunc((budget % 1).toFixed(2) * 100);
  return (
    <Typography component={"span"} classes={{ root: s.budgetMain }}>
      {budgetMain}
      <span className={s.budgetKop}>{budgetKop}</span>₴
    </Typography>
  );
}
