//import { Box, Button } from "@mui/material";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
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
  const [inputType, setInputType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.CREDIT
  );
  const handleDebitBtn = () => {
    setTitle("ADD DEBIT");
    setInputType(TRANSACTION_TYPE.DEBIT);
    onOpen();
  };
  const handleCreditBtn = () => {
    setTitle("ADD CREDIT");
    setInputType(TRANSACTION_TYPE.CREDIT);
    onOpen();
  };
  const handleOnClose = () => {
    onClose();
  };
  if (!user) return null;
  return (
    <Flex w="100%" h="3.5rem">
      <Button w="50%" h="inherit" onClick={handleDebitBtn} colorScheme="green">
        ADD DEBIT
      </Button>
      <Button w="50%" h="inherit" onClick={handleCreditBtn} colorScheme="pink">
        ADD CREDIT
      </Button>

      <ModalInputForm isOpen={isOpen} onClose={onClose} title={title}>
        <InputForm type={inputType} userId={user._id} onClose={handleOnClose} />
      </ModalInputForm>
    </Flex>
  );
}
