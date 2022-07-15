import { Box, Container } from "@mui/material";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import UserAppBar from "../../../components/UserAppBar/UserAppBar";
import UserBalance from "../../../components/UserBalance/UserBalance";
import UserBottomButtons from "../../../components/UserBottomButtons/UserBottomButtons";
import UserDebitCredit from "../../../components/UserDebitCredit/UserDebitCredit";
import UserGoToReport from "../../../components/UserGoToReport/UserGoToReport";
import UserMonth from "../../../components/UserMonth/UserMonth";
import { getUser } from "../../../db/user";
import { iUser } from "../../../interfaces/iUser";
import { iUserResponse } from "../../../interfaces/iUserResponse";

interface UserProps {
  user: iUser;
}

export default function User({ user }: UserProps) {
  if (!user) return <p>Unauthorized</p>;

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
        }}
      >
        <UserAppBar />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            flexGrow: "1",
          }}
        >
          <UserMonth />
          <UserBalance />
          <UserDebitCredit />
        </Box>
        <Box>
          <UserGoToReport />
          <UserBottomButtons />
        </Box>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session || !session.user) {
    return { props: {} };
  }

  const responce = {} as iUserResponse;

  const user = await getUser(session.user);
  responce.user = user;
  return {
    props: responce,
  };
};
