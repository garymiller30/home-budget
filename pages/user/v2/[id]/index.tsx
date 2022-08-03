import { Box, Flex, Spacer } from "@chakra-ui/react";
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
//import { fetchTransactions } from "@/db/transaction/fetchTransactions";
import { getUser } from "@/db/user";
import { useAutoTransferBalance } from "@/hooks/useAutoTransferBalance";
import { iUser } from "@/interfaces/iUser";
import { iUserResponse } from "@/interfaces/iUserResponse";
import { transactionsAtom } from "@/recoil/atoms/transactionsAtom";
import { userAtom } from "@/recoil/atoms/userAtom";
import { appHeight } from "@/utils/appHeight";
import s from "./index.module.css";
import UserLastTransactions from "@/components/UserLastTransactions/UserLastTransactions";
import { useRouter } from "next/router";
import { useTransactionController } from "@/hooks/useTransactionController";
interface UserProps {
  user: iUser;
}

export default function User({ user }: UserProps) {
  const setUser = useSetRecoilState(userAtom);
  const autobalance = useAutoTransferBalance();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();
  const transController = useTransactionController();

  useEffect(() => {
    async function getTransactions() {
      try {
        if (user) {
          await autobalance(user._id);
          await transController.refresh(user._id);
          setIsLoaded(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        //return null;
      }
      //return null;
    }

    getTransactions();
    setUser(user);

    //  хак для сафарі
    window.addEventListener("resize", appHeight);
    appHeight();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <p>Unauthorized</p>;

  return (
    <>
      <Head>
        <title>Home Budget</title>
      </Head>
      <Flex
        bg="whiteAlfa.50"
        w="100%"
        maxW="md"
        m="0 auto"
        flexDirection="column"
        className={s.box}
      >
        <Flex
          flexDirection="column"
          w="100%"
          position="relative"
          top="0"
          left="0"
        >
          <UserAppBar />
          <Flex
            w="100%"
            flexDirection="column"
            alignItems="center"
            className={s.back}
          >
            <UserMonth />
            <UserBalance isLoaded={isLoaded} />
            <UserDebitCredit />
          </Flex>
        </Flex>
        <UserLastTransactions />
        <Spacer />
        <Box w="100%">
          <UserBottomButtons />
        </Box>
      </Flex>
    </>
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
