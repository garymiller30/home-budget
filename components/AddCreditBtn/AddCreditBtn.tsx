import Button from "@mui/material/Button";

interface AddCreditBtnProps {
  onClick: () => void;
}

export default function AddCreditBtn({ onClick }: AddCreditBtnProps) {
  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      add credit
    </Button>
  );
}
