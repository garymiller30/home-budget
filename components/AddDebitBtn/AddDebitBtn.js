import s from "./AddDebitBtn.module.css";
import Button from "@mui/material/Button";

export default function AddDebitBtn({ onClick }) {
  return (
    <Button
      variant="primary"
      color="success"
      className={s.btn}
      onClick={onClick}
    >
      add debit
    </Button>
  );
}
