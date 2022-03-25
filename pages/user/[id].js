import { useState, useEffect, useRef } from "react";
import { getTransactions } from "../../db/transaction";
import { fetchTransactions } from "../../db/fetchTransactions";
import { transactionSplitByType } from "../../lib/transactionSplitByType";
import { getSession } from "next-auth/react";
import Head from "next/head";
import s from "./[id].module.css";
import { getUser } from "../../db/user";
import { getBudget } from "../../lib/getBudget";
import { getPerDay } from "../../lib/getPerDay";
import { TRANSACTION_TYPE } from "../../vars/variables";
import {
  InputForm,
  SignOut,
  Budget,
  DebitTable,
  CreditTable,
  ModalInputForm,
  BottomNavigation,
} from "../../components";
import { daysInMonth } from "../../lib/dateLib";

export default function User({
  user,
  transactions = [],
  initDebit = [],
  initCredit = [],
  initBudget = 0,
  initPerDay = 0,
  initDate,
}) {
  const [date, setDate] = useState(initDate);

  const [trans, setTrans] = useState(transactions);
  const [debit, setDebit] = useState(initDebit);
  const [credit, setCredit] = useState(initCredit);
  const [budget, setBudget] = useState(initBudget);
  const [perDay, setPerDay] = useState(initPerDay);

  const [showModal, setShowModal] = useState(false);
  const [inputType, setInputType] = useState(TRANSACTION_TYPE.CREDIT);

  const isFirstRun = useRef(true);
  useEffect(async () => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      const t = await fetchTransactions({
        userId: user._id,
        year: date.year,
        month: date.month,
      });
      setTrans(t);
    }
  }, [date]);

  useEffect(async () => {
    const { debit, credit } = transactionSplitByType(trans);
    setDebit(debit);
    setCredit(credit);
  }, [trans]);

  useEffect(async () => {
    setBudget(getBudget(debit, credit));
  }, [debit, credit]);

  useEffect(async () => {
    setPerDay(getPerDay(budget, date));
  }, [budget]);

  function handleonDelete(id) {
    setTrans(trans.filter((t) => t._id !== id));
  }

  function handleOnClickDebit(e) {
    setInputType(TRANSACTION_TYPE.DEBIT);
    setShowModal(true);
  }

  function handleOnClickCredit(e) {
    setInputType(TRANSACTION_TYPE.CREDIT);
    setShowModal(true);
  }

  function handleOnClose(transaction) {
    setTrans([...trans, transaction]);
    setShowModal(false);
  }

  function handleOnChangeDate(date) {
    console.log(date);
    setDate(date);
  }
  if (!user) return <p>Unauthorized</p>;

  return (
    <>
      <Head>
        <title>Home budget | {user.name}</title>
      </Head>

      <div className={s.container}>
        <header className={s.header}>
          <SignOut user={user} />
        </header>
        <main className={s.main}>
          <Budget
            budget={budget}
            date={date}
            perDay={perDay}
            onChangeDate={handleOnChangeDate}
          />
          <DebitTable debitArr={debit} onDelete={handleonDelete} />
          <CreditTable creditArr={credit} onDelete={handleonDelete} />
        </main>
        <BottomNavigation
          date={date}
          OnClickDebit={handleOnClickDebit}
          OnClickCredit={handleOnClickCredit}
        />
      </div>
      <ModalInputForm onClose={() => setShowModal(false)} show={showModal}>
        <InputForm type={inputType} userId={user._id} onClose={handleOnClose} />
      </ModalInputForm>
      <div id="modal-root"></div>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { props: {} };
  }

  const responce = { user: session.user };
  const user = await getUser(session.user);
  const transactions = await getTransactions(user);

  const { debit: initDebit, credit: initCredit } =
    transactionSplitByType(transactions);

  const initBudget = getBudget(initDebit, initCredit);
  const date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };

  const initPerDay = getPerDay(initBudget, date);

  responce.transactions = transactions;
  responce.initCredit = initCredit;
  responce.initDebit = initDebit;
  responce.initBudget = initBudget;
  responce.initPerDay = initPerDay;
  responce.initDate = date;
  responce.user = user;
  responce.id = context.params.id;
  return {
    props: responce,
  };
}
