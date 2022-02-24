import { getSession } from "next-auth/react";
import { getUser } from "../db/user";
import { getTransactions } from "../db/transaction";

export default function statistic({ user, transactions }) {
  return <h1>{user.name}</h1>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const props = {};
  if (!session) return { props };

  const user = await getUser(session.user);

  const { year, month } = context.query;
  const trans = await getTransactions(user, { year, month });
  props.user = user;
  props.transactions = trans;

  return { props };
}
