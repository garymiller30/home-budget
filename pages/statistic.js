import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { getSession } from "next-auth/react";
import { getUser } from "../db/user";
import { getTransactions } from "../db/transaction";
import { TRANSACTION_TYPE } from "../vars/variables";
import { groupBy } from "../lib/utils";
import s from "./statistic.module.css";

export default function statistic({ user, date, transactions = [] }) {
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

  const debitData = Object.keys(debitGroup)
    .map((x) => {
      return {
        description: x,
        amount: debitGroup[x].reduce(
          (prev, next) => prev + Number(next.amount),
          0
        ),
      };
    })
    .sort((f, s) => f.amount < s.amount);

  const creditGroup = groupBy(credit, "description");

  const creditData = Object.keys(creditGroup)
    .map((x) => {
      return {
        description: x,
        amount: creditGroup[x].reduce(
          (prev, next) => prev + Number(next.amount),
          0
        ),
      };
    })
    .sort((f, s) => f.amount < s.amount);

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
      <div>
        <h1 className={s.header}>Statistics {` ${date.month}-${date.year}`}</h1>
        <h2 className={s.subheader}>Debit</h2>
        <Bar data={dataD} />
        <h2 className={s.subheader}>Credit</h2>
        <Bar data={dataC} />
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
