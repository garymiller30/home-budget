import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchTransactions } from "../../db/transaction/fetchTransactions";
import { getSession } from "next-auth/react";
import Head from "next/head";
import s from "./[id].module.css";
import { getUser } from "../../db/user";
import { TRANSACTION_TYPE } from "../../vars/variables";
import AppBar from "@mui/material/AppBar";
import { BottomNavigation, TransactionContainer } from "../../components";
import { iDate } from "../../interfaces/iDate";
import { GetServerSideProps } from "next";
import { iUserResponse } from "../../interfaces/iUserResponse";
import { iUser } from "../../interfaces/iUser";
import { iTransaction } from "../../interfaces/iTransaction";

const DynamicModalInputForm = dynamic(
  () => import("../../components/ModalInputForm/ModalInputForm")
);
const DynamicInputForm = dynamic(
  () => import("../../components/Forms/InputForm")
);

const DynamicUserMenu = dynamic(
  () => import("../../components/UserMenu/UserMenu")
);

interface UserProps {
  user: iUser;
}

export default function User({ user }: UserProps) {
  const router = useRouter();
  const { year, month } = router.query;
  const [date, setDate] = useState({
    year: Number(year),
    month: Number(month),
  } as iDate);
  const [trans, setTrans] = useState<iTransaction[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [inputType, setInputType] = useState(TRANSACTION_TYPE.CREDIT);

  // перевіримо, чи потрібно переносити баланс
  useEffect(() => {
    const checkMonthBalance = async () => {
      const curDate = new Date();
      const curYear = curDate.getFullYear();
      const curMonth = curDate.getMonth();

      await fetch(
        `/api/monthBalance?userId=${user._id}&year=${date.year}&month=${date.month}&curYear=${curYear}&curMonth=${curMonth}`
      );
    };

    checkMonthBalance();
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const t = await fetchTransactions(user._id, date.year, date.month);
        setTrans(t);
      } catch (error) {}
    };

    getTransactions();
  }, [date]);

  async function handleonDelete(transaction: iTransaction) {
    const response = await fetch("/api/transaction", {
      method: "DELETE",
      body: JSON.stringify(transaction._id),
    });
    const r = await response.json();
    if (r) {
    }
    //TODO: show error

    setTrans(trans.filter((t) => t._id?.toString() !== transaction._id));
  }

  function handleOnClickDebit() {
    setInputType(TRANSACTION_TYPE.DEBIT);
    setShowModal(true);
  }

  function handleOnClickCredit() {
    setInputType(TRANSACTION_TYPE.CREDIT);
    setShowModal(true);
  }

  function handleOnClose(transaction: iTransaction) {
    setTrans([...trans, transaction]);
    setShowModal(false);
  }

  function handleOnChangeDate(date: iDate) {
    setDate(date);
  }
  if (!user) return <p>Unauthorized</p>;

  return (
    <>
      <Head>
        <title>Home budget | {user.name}</title>
      </Head>

      <div className={s.container}>
        <AppBar position="static">
          <DynamicUserMenu
            user={user}
            date={date}
            onChangeDate={handleOnChangeDate}
          />
        </AppBar>

        <main className={s.main}>
          <TransactionContainer
            transactions={trans}
            date={date}
            onChangeDate={handleOnChangeDate}
            onDelete={handleonDelete}
          />
        </main>
        <BottomNavigation
          date={date}
          OnClickDebit={handleOnClickDebit}
          OnClickCredit={handleOnClickCredit}
        />
      </div>
      <DynamicModalInputForm
        onClose={() => setShowModal(false)}
        show={showModal}
        title={`add ${inputType}`}
      >
        <DynamicInputForm
          type={inputType}
          userId={user._id}
          onClose={handleOnClose}
        />
      </DynamicModalInputForm>
      <div id="modal-root"></div>
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
