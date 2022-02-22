import Head from "next/head";
import { getSession } from "next-auth/react";
import { getUser } from "../../db/user";
import { getTransactions } from "../../db/transaction";
import { TRANSACTION_TYPE } from "../../vars/variables";
import AddDebitBtn from "../../components/AddDebitBtn/AddDebitBtn";
import styles from "./[id].module.css";
import SignOut from "../../components/SignOut/SignOut";
import Budget from "../../components/Budget/Budget";
import DebitTable from "../../components/DebitTable/DebitTable";
import CreditTable from "../../components/CreditTable/CreditTable";
import AddCreditBtn from "../../components/AddCreditBtn/AddCreditBtn";
import { getSum } from "../../lib/transaction";
import ModalInputForm from "../../components/ModalInputForm/ModalInputForm";
import { useState } from "react";
import InputFrm from "../../components/InputForm/InputForm";

export default function User({ user, transactions }) {
  const [trans, setTrans] = useState(transactions);
  const [showModal, setShowModal] = useState(false);
  const [inputType, setInputType] = useState(TRANSACTION_TYPE.CREDIT);

  if (!user) return <p>Unauthorized</p>;

  function handleonDelete(id) {
    console.log(id);
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
  const debit = trans.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.DEBIT
  );
  const credit = trans.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.CREDIT
  );

  const budget = getSum(debit) - getSum(credit);

  return (
    <>
      <Head>
        <title>Home budget | {user.name}</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <SignOut user={user} />
        </header>
        <main className={styles.main}>
          <Budget budget={budget} />
          <DebitTable debitArr={debit} onDelete={handleonDelete} />
          <CreditTable creditArr={credit} onDelete={handleonDelete} />
        </main>
        <div className={styles.btns}>
          <AddDebitBtn onClick={handleOnClickDebit} />
          <AddCreditBtn onClick={handleOnClickCredit} />
        </div>
      </div>
      <ModalInputForm onClose={() => setShowModal(false)} show={showModal}>
        <InputFrm type={inputType} userId={user._id} onClose={handleOnClose} />
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
  responce.transactions = transactions;
  responce.user = user;
  responce.id = context.params.id;
  return {
    props: responce,
  };
}
