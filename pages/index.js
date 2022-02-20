import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getUser } from "../db/user";
import Image from "next/image";
import googleLogo from "../public/google-logo.svg";
import styles from "./index.module.css";

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
      <div className={styles.container}>
        <button className={styles.button} onClick={() => Router.push("/login")}>
          <div className={styles.img}>
            <Image src={googleLogo} width={32} height={32} />
          </div>
          Sign in with Google
        </button>
      </div>
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
