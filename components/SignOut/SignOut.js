import { signOut } from "next-auth/react";
import s from "./SignOut.module.css";
import ico_poweroff from "../../public/power-off.svg";
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
        <Image src={ico_poweroff} width={32} height={32} />
      </button>
    </div>
  );
}
