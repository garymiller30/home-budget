import React from "react";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { getSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getUser } from "../db/user";
import { getTransactions } from "../db/transaction";
import { TRANSACTION_TYPE } from "../vars/variables";
import {
  groupBy,
  getTransactionGroupData,
  getDataTotalAmount,
} from "../lib/utils";
import s from "./statistic.module.css";

export default function statistic({ user, date, transactions = [] }) {
  const router = useRouter();

  if (!user) return <p>Unauthorized</p>;

  const debit =
    transactions.filter(
      (transaction) => transaction.type === TRANSACTION_TYPE.DEBIT
    ) ?? [];

  const credit =
    transactions.filter(
      (transaction) => transaction.type === TRANSACTION_TYPE.CREDIT
    ) ?? [];

  const debitGroup = groupBy(debit, "description");
  const debitData = getTransactionGroupData(debitGroup);
  const debitTotal = getDataTotalAmount(debitData);

  const creditGroup = groupBy(credit, "description");
  const creditData = getTransactionGroupData(creditGroup);
  const creditTotal = getDataTotalAmount(creditData);

  const dataD = {
    labels: debitData.map((x) => x.description),
    datasets: [
      {
        label: "₴",
        data: debitData.map((x) => x.amount),
        backgroundColor: ["rgba(0, 255, 132, 0.2)"],
        borderColor: ["rgba(0, 0, 0, 0.3)"],
        borderWidth: 1,
      },
    ],
  };
  const dataC = {
    labels: creditData.map((x) => x.description),
    datasets: [
      {
        label: "₴",
        data: creditData.map((x) => x.amount),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className={s.container}>
        <Typography variant="h4" className={s.header}>
          Statistics <span>{` ${date.month}-${date.year}`}</span>
        </Typography>
        <Typography variant="h5" className={s.subheader}>
          Debit <span>₴ {debitTotal}</span>
        </Typography>
        <Bar data={dataD} />
        <Typography variant="h5" className={s.subheader}>
          Credit <span>₴ {creditTotal}</span>
        </Typography>
        <Bar data={dataC} />
        <Button variant="contained" onClick={() => router.back()}>
          back
        </Button>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const props = {};
  if (!session) return { props };

  const user = await getUser(session.user);
  const { year, month } = context.query;

  const trans = await getTransactions(user, { year, month });
  props.user = user;
  props.transactions = trans;
  props.date = { year, month };

  return { props };
}
