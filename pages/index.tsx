import { useSession, getSession } from "next-auth/react";
import { getUser } from "../db/user";
import s from "./index.module.css";
import { Circles } from "react-loader-spinner";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { Box, Button, VStack } from "@chakra-ui/react";

export default function Home() {
  const { status } = useSession();

  if (status === "loading" || status === "authenticated") {
    return (
      <div className={s.spinner}>
        <Circles color="#00BFFF" height={80} width={80} />
      </div>
    );
  } else if (status === "unauthenticated") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        bg="linear-gradient(120deg, #3b6fc8 0%, #a044ff 100%)"
        h="100vh"
      >
        <VStack
          spacing={5}
          flexGrow="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            size="large"
            p={3}
          >
            Sign in with Google
          </Button>
        </VStack>
      </Box>
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
