import { useState, useEffect } from "react";
import { getBudget, getPerDay, transactionSplitByType } from "../../../lib";
import { Budget, TransactionTable } from "../../";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
      <TransactionTable
        icon={ArrowUpwardIcon}
        color="success"
        transactions={debit}
        onDelete={onDelete}
      />
      <TransactionTable
        icon={ArrowDownwardIcon}
        color="secondary"
        transactions={credit}
        onDelete={onDelete}
      />
    </>
  );
}
