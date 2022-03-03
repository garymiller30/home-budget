import s from "./AddCreditBtn.module.css";
import Button from "@mui/material/Button";

export default function AddCreditBtn({ onClick }) {
  return (
    <Button variant="contained" className={s.btn} onClick={onClick}>
      add credit
    </Button>
  );
}
