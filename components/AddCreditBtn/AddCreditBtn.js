import s from "./AddCreditBtn.module.css";
import Router from "next/router";

export default function AddCreditBtn() {
  return (
    <button className={s.btn} onClick={() => Router.push("/credit")}>
      add credit
    </button>
  );
}
