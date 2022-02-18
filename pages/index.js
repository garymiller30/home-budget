import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getUser } from "../db/user";

import Router from "next/router";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <>
        <p>LOADING...</p>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => Router.push("/login")}>Sign in</button>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const user = await getUser(session.user);

  context.res.statusCode = 302;
  context.res.setHeader("Location", `/user/${user._id}`);

  return {
    props: {},
  };
}
