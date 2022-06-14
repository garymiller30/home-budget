import { useSession, getSession } from "next-auth/react";
import { getUser } from "../db/user";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import s from "./index.module.css";
import { Circles } from "react-loader-spinner";
import Router, { useRouter } from "next/router";
import { iUser } from "../interfaces/iUser";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

interface HomeProps {
  user: iUser;
}
export default function Home({ user }: HomeProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      router.push(`/user/${user._id}?year=${year}&month=${month}`);
    }
  }, []);

  console.log("user:", user);
  if (status === "loading" || status === "authenticated") {
    return (
      <div className={s.spinner}>
        <Circles color="#00BFFF" height={80} width={80} />
      </div>
    );
  } else if (status === "unauthenticated") {
    return (
      <div className={`${s.container} ${s.bg}`}>
        <Stack spacing={5}>
          <Typography variant="h2" className={s.title}>
            simple budget
            <br /> app
          </Typography>
          <Button
            onClick={() => Router.push("/login")}
            variant="contained"
            size="large"
          >
            Sign in with Google
          </Button>
        </Stack>
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !session.user) {
    return { props: {} };
  }

  const user = await getUser(session.user);

  // context.res.statusCode = 302;
  // context.res.setHeader("Location", `/user/${user._id}`);

  return {
    props: { user },
  };
};
