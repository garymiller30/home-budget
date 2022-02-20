import { signOut } from "next-auth/react";
import s from "./SignOut.module.css";
import Image from "next/image";

export default function SignOut({ user }) {
  return (
    <div className={s.container}>
      <p className={s.user_name}>
        <img src={user.image} width={32} height={32} />
        <span> {user.name}</span>
      </p>
      <button
        className={s.btn_signout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <Image src="/power-off.svg" width={32} height={32} fill={"darkgray"} />
      </button>
    </div>
  );
}
