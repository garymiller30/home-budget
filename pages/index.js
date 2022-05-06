import { useSession, getSession } from "next-auth/react";
import { getUser } from "../db/user";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
