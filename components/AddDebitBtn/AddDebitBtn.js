import s from "./AddDebitBtn.module.css";
import Router from "next/router";

export default function AddDebitBtn() {
  return (
    <button className={s.btn} onClick={() => Router.push("/debit")}>
      add debit
    </button>
  );
}
