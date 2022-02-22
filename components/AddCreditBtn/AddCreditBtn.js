import s from "./AddCreditBtn.module.css";

export default function AddCreditBtn({ onClick }) {
  return (
    <button className={s.btn} onClick={onClick}>
      add credit
    </button>
  );
}
