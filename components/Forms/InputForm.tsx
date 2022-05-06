import React, { useEffect, useRef } from "react";
import fetch from "isomorphic-unfetch";
import Transaction from "../../model/transaction";
import s from "./InputForm.module.css";
import { TRANSACTION_TYPE } from "../../vars/variables";

interface InputFormProps {
  type: TRANSACTION_TYPE;
  userId: string;
  onClose: (transaction: Transaction) => void;
}

interface targetProps {}

export default function InputForm({ type, userId, onClose }: InputFormProps) {
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const { target } = event;

    const transaction = new Transaction();
    transaction.ownerId = userId;
    transaction.type = type;
    transaction.description = (
      event.target as any
    ).description.value.trim() as string;
    transaction.comment = (event.target as any).comment.value.trim();
    transaction.amount = (event.target as any).amount.value;
    if (buttonRef.current) (buttonRef.current as any).disabled = true;
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(transaction),
      });
      const t = await response.json();
      //console.log("t", t);
      onClose(t);
    } catch (err) {
      //TODO: show error
      if (buttonRef.current) (buttonRef.current as any).disabled = false;
    }
  };

  const focusInput = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    if (focusInput.current) (focusInput.current as any).focus();
  }, []);

  return (
    <div className={s.container}>
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
        <label className={s.label} htmlFor="comment">
          Comment
        </label>
        <input
          className={s.input}
          id="comment"
          type="text"
          name="comment"
        ></input>
        <label className={s.label} htmlFor="amount">
          ₴
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
        <button ref={buttonRef} className={s.button} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
