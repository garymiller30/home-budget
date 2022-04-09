import { useState, useEffect } from "react";
import Ico_down from "../../public/arrow-down-bold.svg";
import s from "./CreditTable.module.css";
import TransactionList from "../../components/Transaction/List/TransactionList";
import { splitFloatNumber, getSum } from "../../lib";

export default function CreditTable({ creditArr, onDelete }) {
  const [credit, setCebit] = useState(creditArr);
  const [sum, setSum] = useState([0, 0]);

  useEffect(() => {
    setCebit(creditArr);
    const s = getSum(creditArr);
    const splitted = splitFloatNumber(s);
    setSum(splitted);
  }, [creditArr]);

  return (
    <section className={s.container}>
      <h3>
        <div className={s.arrow}>
          <Ico_down width={32} height={32} fill={"red"} />
        </div>
        <p className={s.budgetMain}>
          ({sum[0]}
          <span className={s.budgetKop}>{sum[1]}</span> ₴)
        </p>
      </h3>
      <TransactionList transactions={credit} onDelete={onDelete} />
    </section>
  );
}
