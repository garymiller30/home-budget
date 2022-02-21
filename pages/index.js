import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getUser } from "../db/user";
import Image from "next/image";
import s from "./index.module.css";

import { Circles } from "react-loader-spinner";

import Router from "next/router";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className={s.spinner}>
        <Circles color="#00BFFF" height={80} width={80} />
      </div>
    );
  } else {
    return (
      <div className={s.container}>
        <button className={s.button} onClick={() => Router.push("/login")}>
          <div className={s.img}>
            <Image src="/google-logo.svg" width={32} height={32} />
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
