import Head from "next/head";
import { getSession, signOut } from "next-auth/react";
import { getUser } from "../../db/user";
import { getTransactions } from "../../db/transaction";
import Router from "next/router";

export default function User({ id, user, transactions }) {
  console.log("props:", id);
  return (
    <>
      <Head>
        <title>Home budget | {user.name}</title>
      </Head>
      <header>
        <img src={user.image} width="32"></img> Signed in as {user.name}
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </header>
      <div> budget: {user.budget} ₴</div>
      <section>
        <h3>Transactions</h3>
        <ul>
          {transactions.map((x) => (
            <li key={x._id}>
              {x.description}:{x.amount} ₴
            </li>
          ))}
        </ul>
      </section>
      <div>
        <button onClick={() => Router.push("/debit")}>debit</button>
        <button onClick={() => Router.push("/credit")}>credit</button>
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
