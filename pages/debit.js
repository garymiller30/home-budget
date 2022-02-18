import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getUser } from "../db/user";
import { TRANSACTION_TYPE } from "../vars/variables";

import InputForm from "../components/inputForm/InputForm";

export default function debit({ user }) {
  const { status } = useSession();
  console.log("status", status);
  if (!user) {
    return <p>Not authenticated</p>;
  }

  return <InputForm type={TRANSACTION_TYPE.DEBIT} userId={user._id} />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("session:", session);
  if (!session) {
    return { props: {} };
  }

  const responce = { user: session.user };
  const user = await getUser(session.user);
  responce.user = user;
  return {
    props: responce,
  };
}
