import s from "./AddDebitBtn.module.css";

export default function AddDebitBtn({ onClick }) {
  return (
    <button className={s.btn} onClick={onClick}>
      add debit
    </button>
  );
}
