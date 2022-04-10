import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getTransactions } from "../../db/transaction";
import { fetchTransactions } from "../../db/fetchTransactions";
import { getSession } from "next-auth/react";
import Head from "next/head";
import s from "./[id].module.css";
import { getUser } from "../../db/user";
import { TRANSACTION_TYPE } from "../../vars/variables";
import AppBar from "@mui/material/AppBar";

import {
  InputForm,
  ModalInputForm,
  BottomNavigation,
  UserMenu,
  TransactionContainer,
} from "../../components";

export default function User({ user, transactions = [] }) {
  const router = useRouter();

  const { year, month } = router.query;

  const [date, setDate] = useState({ year, month });
  const [trans, setTrans] = useState(transactions);

  const [showModal, setShowModal] = useState(false);
  const [inputType, setInputType] = useState(TRANSACTION_TYPE.CREDIT);

  const isFirstRun = useRef(true);

  useEffect(() => {
    setTrans(transactions);
  }, [transactions]);

  useEffect(async () => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      try {
        const t = await fetchTransactions({
          userId: user._id,
          year: date.year,
          month: date.month,
        });
        setTrans(t);
      } catch (error) {}
    }
  }, [date]);

  function handleonDelete(id) {
    setTrans(trans.filter((t) => t._id !== id));
  }

  function handleOnClickDebit(e) {
    setInputType(TRANSACTION_TYPE.DEBIT);
    setShowModal(true);
  }

  function handleOnClickCredit(e) {
    setInputType(TRANSACTION_TYPE.CREDIT);
    setShowModal(true);
  }

  function handleOnClose(transaction) {
    setTrans([...trans, transaction]);
    setShowModal(false);
  }

  function handleOnChangeDate(date) {
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
          <UserMenu user={user} />
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
      <ModalInputForm
        onClose={() => setShowModal(false)}
        show={showModal}
        title={`add ${inputType}`}
      >
        <InputForm type={inputType} userId={user._id} onClose={handleOnClose} />
      </ModalInputForm>
      <div id="modal-root"></div>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { props: {} };
  }
  let { year, month } = context.query;

  const responce = { user: session.user };
  const user = await getUser(session.user);

  if (!year || !month) {
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    context.res.statusCode = 302;
    context.res.setHeader(
      "Location",
      `/user/${user._id}?year=${year}&month=${month}`
    );
  }

  const transactions = await getTransactions(user, { year, month });
  responce.transactions = transactions;
  responce.user = user;
  responce.id = context.params.id;
  return {
    props: responce,
  };
}
