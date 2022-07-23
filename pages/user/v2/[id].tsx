import { Box, Skeleton } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import UserAppBar from "@/components/UserAppBar/UserAppBar";
import UserBalance from "@/components/UserBalance/UserBalance";
import UserBottomButtons from "@/components/UserBottomButtons/UserBottomButtons";
import UserDebitCredit from "@/components/UserDebitCredit/UserDebitCredit";
// import UserGoToReport from "../../../components/UserGoToReport/UserGoToReport";
import UserMonth from "@/components/UserMonth/UserMonth";
import { fetchTransactions } from "@/db/transaction/fetchTransactions";
import { getUser } from "@/db/user";
import { useAutoTransferBalance } from "@/hooks/useAutoTransferBalance";
import { iUser } from "@/interfaces/iUser";
import { iUserResponse } from "@/interfaces/iUserResponse";
import { transactionsAtom } from "@/recoil/atoms/transactionsAtom";
import { userAtom } from "@/recoil/atoms/userAtom";
import { appHeight } from "@/utils/appHeight";
import s from "./[id].module.css";
import UserLastTransactions from "@/components/UserLastTransactions/UserLastTransactions";
interface UserProps {
  user: iUser;
}

export default function User({ user }: UserProps) {
  const setTransList = useSetRecoilState(transactionsAtom);
  const setUser = useSetRecoilState(userAtom);
  const autobalance = useAutoTransferBalance();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function getTransactions() {
    try {
      if (user) {
        await autobalance(user._id);
        const date = new Date();
        const t = await fetchTransactions(
          user._id,
          date.getFullYear(),
          date.getMonth() + 1
        );
        return t;
      }
    } catch (error) {
      return null;
    }
    return null;
  }
  useEffect(() => {
    const transPromise = getTransactions();
    transPromise.then((data) => {
      setTransList(data);
      setIsLoaded(true);
    });
    //   getTransactions();
    setUser(user);
    //  хак для сафарі
    window.addEventListener("resize", appHeight);
    appHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <p>Unauthorized</p>;

  return (
    <div>
      <Head>
        <title>Home Budget</title>
      </Head>
      <Box sx={{ maxWidth: "md", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          className={`${s.box}`}
        >
          <UserAppBar />
          <Box sx={{ display: "flex", width: "100%" }} pb={2}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
                position: "relative",
                left: 0,
                top: 0,
              }}
              className={`${s.back}`}
            >
              <UserMonth />
              <UserBalance isLoaded={isLoaded} />
              <UserDebitCredit />
            </Box>
          </Box>
          <UserLastTransactions />
          <Box>
            {/* <UserGoToReport /> */}
            <UserBottomButtons />
          </Box>
        </Box>
        <div id="modal-root"></div>
      </Box>
    </div>
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
