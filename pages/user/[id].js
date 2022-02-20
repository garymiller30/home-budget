import Head from "next/head";
import { getSession } from "next-auth/react";
import { getUser } from "../../db/user";
import { getTransactions } from "../../db/transaction";
import Router from "next/router";
import { TRANSACTION_TYPE } from "../../vars/variables";
import TransactionList from "../../components/Transaction/List/TransactionList";
import styles from "./[id].module.css";

import SignOut from "../../components/SignOut/SignOut";

export default function User({ user, transactions }) {
  if (!user) return <p>Unauthorized</p>;

  const debit = transactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.DEBIT
  );
  const credit = transactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.CREDIT
  );

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
          <section className={styles.budget}>
            budget: <span>{user.budget}</span> ₴
          </section>
          <section className={styles.sec_debit}>
            <h3>Debit</h3>
            <TransactionList transactions={debit} />
          </section>
          <section className={styles.sec_credit}>
            <h3>Credit</h3>
            <TransactionList transactions={credit} />
          </section>
          <div className={styles.btns}>
            <button
              className={styles.btn_debit}
              onClick={() => Router.push("/debit")}
            >
              add debit
            </button>
            <button
              className={styles.btn_credit}
              onClick={() => Router.push("/credit")}
            >
              add credit
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("session:", session);
  if (!session) {
    return { props: {} };
  }

  const responce = { user: session.user };
  const user = await getUser(session.user);
  const transactions = await getTransactions(user);
  responce.transactions = transactions;
  console.log("index.js user", user);
  responce.user = user;
  responce.id = context.params.id;
  return {
    props: responce,
  };
}
