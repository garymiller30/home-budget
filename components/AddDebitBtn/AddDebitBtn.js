import s from "./AddDebitBtn.module.css";
import Router from "next/router";

export default function AddDebitBtn({ onClick }) {
  return (
    <button className={s.btn} onClick={onClick}>
      add debit
    </button>
  );
}
