import React, { useEffect, useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import Transaction from "../../model/transaction";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { iTransaction } from "../../interfaces/iTransaction";
import { Button, Container, FormControl, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTransactionController } from "../../hooks/useTransactionController";

interface InputFormProps {
  type: TRANSACTION_TYPE;
  userId: string;
  onClose: () => void;
}

export default function InputForm({ type, userId, onClose }: InputFormProps) {
  const contoller = useTransactionController();
  const [saving, setSaving] = useState<boolean>(false);
  const onSubmit = async (event: any) => {
    event.preventDefault();
    setSaving(true);
    const transaction = new Transaction();
    transaction.ownerId = userId;
    transaction.type = type;
    transaction.description = (
      event.target as any
    ).description.value.trim() as string;
    transaction.comment = (event.target as any).comment.value.trim();
    transaction.amount = (event.target as any).amount.value;

    try {
      await contoller.add(transaction);
      onClose();
    } catch (err) {
      //TODO: show error
      setSaving(false);
    }
  };

  const focusInput = useRef(null);

  useEffect(() => {
    if (focusInput.current) (focusInput.current as any).focus();
  }, []);

  return (
    <Container sx={{ padding: "6px 0" }}>
      <form onSubmit={onSubmit}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            ref={focusInput}
            id="description"
            type="text"
            name="description"
            label="Description"
            required
            autoFocus
            sx={{ width: "100%", padding: "12px 0" }}
          ></TextField>
          <TextField
            label="Comment"
            id="comment"
            type="text"
            name="comment"
            sx={{ width: "100%", padding: "12px 0" }}
          ></TextField>
          <TextField
            id="amount"
            type="number"
            name="amount"
            label="₴"
            required
            sx={{ width: "100%", padding: "12px 0" }}
          ></TextField>
          <LoadingButton
            variant="contained"
            size="large"
            loading={saving}
            type="submit"
          >
            ADD
          </LoadingButton>
        </FormControl>
      </form>
    </Container>
  );
}
