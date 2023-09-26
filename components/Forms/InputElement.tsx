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
import { useRef } from "react";

export default function InputElement() {
  const commentRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  return (
    <>
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
        <NumberInput
          step={0.01}
          id="amount"
          pattern="[0-9]*([.,][0-9]+)?"
          isValidCharacter={(value: string) => true}
        >
          <NumberInputField type="number" ref={amountRef} />
        </NumberInput>
      </FormControl>
    </>
  );
}
