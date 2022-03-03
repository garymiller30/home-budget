import s from "./AddDebitBtn.module.css";
import Button from "@mui/material/Button";

export default function AddDebitBtn({ onClick }) {
  return (
    <Button
      variant="contained"
      color="primary"
      className={s.btn}
      onClick={onClick}
    >
      add debit
    </Button>
  );
}
