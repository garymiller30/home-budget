import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { getSession } from "next-auth/react";
import Head from "next/head";
import s from "./[id].module.css";
import { getSum } from "../../lib/transaction";
import { getUser } from "../../db/user";
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

export default function User({ user }) {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [trans, setTrans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputType, setInputType] = useState(TRANSACTION_TYPE.CREDIT);

  useEffect(async () => {
    const response = await fetch(
      `/api/transaction?userId=${user._id}&year=${date.year}&month=${date.month}`,
      {
        method: "GET",
      }
    );
    const t = await response.json();
    setTrans(t);
  }, [date]);

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
  const debit = trans.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.DEBIT
  );
  const credit = trans.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.CREDIT
  );

  const budget = getSum(debit) - getSum(credit);

  const perDay = (
    budget /
    (daysInMonth(date.year, date.month) - new Date().getDate())
  ).toFixed(2);

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
  // const transactions = await getTransactions(user);
  // responce.transactions = transactions;
  responce.user = user;
  responce.id = context.params.id;
  return {
    props: responce,
  };
}
