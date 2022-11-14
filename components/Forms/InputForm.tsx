import React, { useRef, useState } from "react";
import Transaction from "../../model/transaction";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { useTransactionController } from "../../hooks/useTransactionController";
import {
  Button,
  CircularProgress,
  Container,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface InputFormProps {
  type: TRANSACTION_TYPE;
  userId: string;
  onClose: () => void;
}

export default function InputForm({ type, userId, onClose }: InputFormProps) {
  const contoller = useTransactionController();
  const [saving, setSaving] = useState<boolean>(false);

  const commentRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

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

  return (
    <Container sx={{ padding: "6px 0" }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Flex alignItems="end">
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" id="description" autoFocus />
            </FormControl>
            <IconButton
              aria-label="next"
              icon={<ArrowForwardIcon />}
              onClick={() => commentRef.current?.focus()}
            />
          </Flex>
          <Flex alignItems="end">
            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Input ref={commentRef} placeholder="Comment" id="comment" />
            </FormControl>
            <IconButton
              aria-label="next"
              icon={<ArrowForwardIcon />}
              onClick={() => amountRef.current?.focus()}
            />
          </Flex>
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              ref={amountRef}
              type="number"
              step="0.01"
              id="amount"
              placeholder="Amount"
            />
          </FormControl>

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
