import { useSession, getSession } from "next-auth/react";
import { getUser } from "../db/user";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import s from "./index.module.css";
import { Circles } from "react-loader-spinner";
//import Router, { useRouter } from "next/router";
import { iUser } from "../interfaces/iUser";
import { GetServerSideProps } from "next";
//import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { Button, HStack, Text } from "@chakra-ui/react";

interface HomeProps {
  user: iUser;
}
export default function Home() {
  const { status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     router.push(`/user/v2/${user._id}`);
  //   }
  // }, []);

  //console.log("user:", user);
  if (status === "loading" || status === "authenticated") {
    return (
      <div className={s.spinner}>
        <Circles color="#00BFFF" height={80} width={80} />
      </div>
    );
  } else if (status === "unauthenticated") {
    return (
      <div className={`${s.container} ${s.bg}`}>
        <HStack spacing={5}>
          <Text variant="h2">Home budget</Text>
          <Button
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            variant="contained"
            size="large"
          >
            Sign in with Google
          </Button>
        </HStack>
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { res } = context;
  if (!session || !session.user) {
    return { props: {} };
  }

  const user = await getUser(session.user);

  res.setHeader("Location", `/user/v2/${user._id}`);
  res.statusCode = 302;
  res.end();
  return { props: {} };
};
