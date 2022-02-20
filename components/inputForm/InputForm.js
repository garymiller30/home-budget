import React, { useEffect, useRef } from "react";
import fetch from "isomorphic-unfetch";
import Transaction from "../../model/transaction";
import Router from "next/router";
import s from "./InputForm.module.css";

export default function InputForm({ type, userId }) {
  const onSubmit = async (event) => {
    event.preventDefault();
    const transaction = new Transaction();
    transaction.ownerId = userId;
    transaction.type = type;
    transaction.description = event.target.description.value;
    transaction.amount = event.target.amount.value;
    const response = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
    });
    const trans = await response.json();

    console.log("created transaction:", trans);

    Router.push("/");
  };

  const focusInput = useRef(null);
  useEffect(() => {
    focusInput.current.focus();
  }, []);

  return (
    <div className={s.container}>
      <h2>{type}</h2>
      <form className={s.form} onSubmit={onSubmit}>
        <label className={s.label} htmlFor="description">
          Description
        </label>
        <input
          ref={focusInput}
          className={s.input}
          id="description"
          type="text"
          name="description"
          required
          autoFocus
        ></input>
        <label className={s.label} htmlFor="amount">
          Amount
        </label>
        <input
          className={s.input}
          id="amount"
          type="number"
          name="amount"
          step="0.01"
          min="0"
          required
        ></input>
        <button className={s.button} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
