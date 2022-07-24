//import { Box, Button } from "@mui/material";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/atoms/userAtom";
import { TRANSACTION_TYPE } from "../../vars/variables";
import InputForm from "../Forms/InputForm";
import ModalInputForm from "../ModalInputForm/ModalInputForm";

export default function UserBottomButtons() {
  const user = useRecoilValue(userAtom);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState<string>("credit");
  const [inputType, setInputType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.CREDIT
  );
  const handleDebitBtn = () => {
    setTitle("ADD DEBIT");
    setInputType(TRANSACTION_TYPE.DEBIT);
    setShowModal(true);
  };
  const handleCreditBtn = () => {
    setTitle("ADD CREDIT");
    setInputType(TRANSACTION_TYPE.CREDIT);
    setShowModal(true);
  };
  const handleOnClose = () => {
    setShowModal(false);
  };
  if (!user) return null;
  return (
    <Flex w="100%" h="3.5rem">
      <Button w="50%" h="inherit" onClick={handleDebitBtn} bg="green">
        <Text color="white">ADD DEBIT</Text>
      </Button>
      <Button w="50%" h="inherit" onClick={handleCreditBtn} bg="darkmagenta">
        <Text color="white">ADD CREDIT</Text>
      </Button>

      <ModalInputForm
        show={showModal}
        onClose={() => setShowModal(false)}
        title={title}
      >
        <InputForm type={inputType} userId={user._id} onClose={handleOnClose} />
      </ModalInputForm>
    </Flex>
  );
}
