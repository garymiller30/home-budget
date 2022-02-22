import Ico_down from "../../public/arrow-down-bold.svg";
import s from "./CreditTable.module.css";
import TransactionList from "../../components/Transaction/List/TransactionList";
import { getSum } from "../../lib/transaction";

export default function CreditTable({ creditArr, onDelete }) {
  const sum = getSum(creditArr).toFixed(2);
  return (
    <section className={s.container}>
      <h3>
        <div className={s.arrow}>
          <Ico_down width={32} height={32} fill={"red"} />
        </div>
        <p>({sum} ₴)</p>
      </h3>
      <TransactionList transactions={creditArr} onDelete={onDelete} />
    </section>
  );
}
