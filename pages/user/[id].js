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

export default function User({ user, transactions }) {
  if (!user) return <p>Unauthorized</p>;

  const debit = transactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.DEBIT
  );
  const credit = transactions.filter(
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
          <DebitTable debitArr={debit} />
          <CreditTable creditArr={credit} />
        </main>
        <div className={styles.btns}>
          <AddDebitBtn />
          <AddCreditBtn />
        </div>
      </div>
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
