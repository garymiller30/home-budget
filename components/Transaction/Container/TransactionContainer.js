import { useState, useEffect } from "react";
import { getBudget, getPerDay, transactionSplitByType } from "../../../lib";
import { Budget, DebitTable, CreditTable } from "../../";
export default function TransactionContainer({
  transactions = [],
  date,
  onChangeDate,
  onDelete,
}) {
  const [debit, setDebit] = useState([]);
  const [credit, setCredit] = useState([]);
  const [budget, setBudget] = useState(0);
  const [perDay, setPerDay] = useState(0);

  useEffect(() => {
    const { debit, credit } = transactionSplitByType(transactions);
    setDebit(debit);
    setCredit(credit);
    const bdgt = getBudget(debit, credit);
    setBudget(bdgt);
    setPerDay(getPerDay(bdgt, date));
  }, [transactions]);
  return (
    <>
      <Budget
        budget={budget}
        perDay={perDay}
        date={date}
        onChangeDate={onChangeDate}
      />
      <DebitTable debitArr={debit} onDelete={onDelete} />
      <CreditTable creditArr={credit} onDelete={onDelete} />
    </>
  );
}
