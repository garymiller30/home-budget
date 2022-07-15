import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
import s from "./[id].module.css";
interface UserProps {
  user: iUser;
}
const styles = () =>
  makeStyles(() => ({
    Box: {
      "& ::after": {
        content: '""',
        display: "block",
        height: "100%",
        width: "100%",
        position: "absolute",
        background: "rgba(217, 217, 217, 0.35)",
        borderRadius: "0px 0px 0px 187px",
        top: "0",
        left: "0",
      },
    },
  }));

export default function User({ user }: UserProps) {
  const classes: any = styles();
  if (!user) return <p>Unauthorized</p>;

  return (
    <Box sx={{ maxWidth: "md" }}>
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
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "85vh",
              top: "0",
              left: "0",
              background: "rgba(217, 217, 217, 0.35)",
              borderRadius: "0 0 0 190px",
              zIndex: "-1",
            }}
          ></Box>
        </Box>
        <Box>
          <UserGoToReport />
          <UserBottomButtons />
        </Box>
      </Box>
    </Box>
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
