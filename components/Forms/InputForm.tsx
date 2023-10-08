import React, { useState } from "react";
import Transaction from "../../model/transaction";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { useTransactionController } from "../../hooks/useTransactionController";
import {
  Button,
  CircularProgress,
  Container,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import InputElement from "./InputElement";

interface InputFormProps {
  type: TRANSACTION_TYPE;
  userId: string;
  onClose: () => void;
  onError: () => void;
}

export default function InputForm({
  type,
  userId,
  onClose,
  onError,
}: InputFormProps) {
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
      onError();
    }
  };

  return (
    <Container sx={{ padding: "6px 0" }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <InputElement />
          <Spacer />
          <Button w="100%" type="submit">
            {saving && (
              <CircularProgress
                size="1.5rem"
                isIndeterminate
                color="green.300"
              />
            )}
            <Text>ADD</Text>
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
