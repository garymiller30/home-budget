import s from "./DebitTable.module.css";
import { getSum } from "../../lib/transaction";
import Ico_up from "../../public/arrow-up-bold.svg";
import TransactionList from "../../components/Transaction/List/TransactionList";
export default function DebitTable({ debitArr }) {
  const sum = getSum(debitArr).toFixed(2);

  return (
    <section className={s.container}>
      <h3>
        <div className={s.arrow}>
          <Ico_up width={32} height={32} fill={"green"} />
        </div>
        <p>({sum} ₴)</p>
      </h3>
      <TransactionList transactions={debitArr} />
    </section>
  );
}
