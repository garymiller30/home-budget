import { iTransaction } from "@/interfaces/iTransaction";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import Transaction from "model/transaction";
import { useRef, useState } from "react";

interface ReturnProps {
  comment: string;
  description: string;
  amount: number;
}

interface Props {
  transaction?: iTransaction;
  getData?: () => ReturnProps;
}

export default function InputElement({ transaction, getData }: Props) {
  const commentRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Flex alignItems="end">
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Description"
            id="description"
            defaultValue={transaction?.description}
            autoFocus
          />
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
          <Input
            ref={commentRef}
            placeholder="Comment"
            defaultValue={transaction?.comment}
            id="comment"
          />
        </FormControl>
        <IconButton
          aria-label="next"
          icon={<ArrowForwardIcon />}
          onClick={() => amountRef.current?.focus()}
        />
      </Flex>
      <FormControl isRequired>
        <FormLabel>Amount</FormLabel>
        <NumberInput
          step={0.01}
          id="amount"
          pattern="[0-9]*([.,][0-9]+)?"
          isValidCharacter={(value: string) => true}
          defaultValue={transaction?.amount}
        >
          <NumberInputField type="number" ref={amountRef} />
        </NumberInput>
      </FormControl>
    </>
  );
}
