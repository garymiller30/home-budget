import s from "./AddDebitBtn.module.css";
import Button from "@mui/material/Button";

interface AddDebitBtnProps {
  onClick: () => void;
}

export default function AddDebitBtn({ onClick }: AddDebitBtnProps) {
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
