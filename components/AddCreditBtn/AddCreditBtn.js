import s from "./AddCreditBtn.module.css";
import Router from "next/router";

export default function AddCreditBtn({ onClick }) {
  return (
    <button className={s.btn} onClick={onClick}>
      add credit
    </button>
  );
}
