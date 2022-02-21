import Head from "next/head";
import { getSession } from "next-auth/react";
import { getUser } from "../../db/user";
import { getTransactions } from "../../db/transaction";
import Router from "next/router";
import { TRANSACTION_TYPE } from "../../vars/variables";

import styles from "./[id].module.css";

import SignOut from "../../components/SignOut/SignOut";
import Budget from "../../components/Budget/Budget";
import DebitTable from "../../components/DebitTable/DebitTable";
import CreditTable from "../../components/CreditTable/CreditTable";

export default function User({ user, transactions }) {
  if (!user) return <p>Unauthorized</p>;

  const debit = transactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.DEBIT
  );
  const credit = transactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.CREDIT
  );

  // const debitSum = getSum(debit).toFixed(2);
  // const creditSum = getSum(credit).toFixed(2);

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
          <Budget budget={user.budget} />
          <DebitTable debitArr={debit} />
          <CreditTable creditArr={credit} />
          {/* <section className={styles.sec_credit}>
            <h3>
              <div className={styles.arrow_debit}>
                <Ico_down width={32} height={32} fill={"red"} />
              </div>
              <p>({creditSum} ₴)</p>
            </h3>
            <TransactionList transactions={credit} />
          </section> */}
        </main>
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
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  //console.log("session:", session);
  if (!session) {
    return { props: {} };
  }

  const responce = { user: session.user };
  const user = await getUser(session.user);
  const transactions = await getTransactions(user);
  responce.transactions = transactions;
  //console.log("index.js user", user);
  responce.user = user;
  responce.id = context.params.id;
  return {
    props: responce,
  };
}
