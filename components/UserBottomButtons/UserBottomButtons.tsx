import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/atoms/userAtom";
import { TRANSACTION_TYPE } from "../../vars/variables";
import InputForm from "../Forms/InputForm";
import ModalInputForm from "../ModalInputForm/ModalInputForm";

export default function UserBottomButtons() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userAtom);
  const [title, setTitle] = useState<string>("credit");
  const [colorScheme, setColorScheme] = useState<string>("pink");
  const toast = useToast();

  const [inputType, setInputType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.CREDIT
  );
  const handleDebitBtn = () => {
    setTitle("ADD DEBIT");
    setColorScheme("green");
    setInputType(TRANSACTION_TYPE.DEBIT);
    onOpen();
  };
  const handleCreditBtn = () => {
    setTitle("ADD CREDIT");
    setColorScheme("pink");
    setInputType(TRANSACTION_TYPE.CREDIT);
    onOpen();
  };
  const handleOnClose = () => {
    onClose();
    toast({
      position: "top",
      description: "Added new transaction",
      status: "success",
      duration: 1000,
      isClosable: false,
    });
  };

  const handleOnError = () => {
    toast({
      position: "top",
      description: "Something wrong",
      status: "error",
      duration: 1000,
      isClosable: false,
    });
  };

  const handleCloseFromBtn = () => {
    onClose();
  };

  if (!user) return null;
  return (
    <Flex w="100%" h="3.5rem">
      <IconButton
        w="50%"
        h="inherit"
        onClick={handleDebitBtn}
        colorScheme="green"
        aria-label="add transaction"
      />

      <IconButton
        w="50%"
        h="inherit"
        onClick={handleCreditBtn}
        colorScheme="pink"
        aria-label="delete transaction"
      />

      <ModalInputForm
        isOpen={isOpen}
        onClose={handleCloseFromBtn}
        title={title}
        colorScheme={colorScheme}
      >
        <InputForm
          type={inputType}
          userId={user._id}
          onClose={handleOnClose}
          onError={handleOnError}
        />
      </ModalInputForm>
    </Flex>
  );
}
