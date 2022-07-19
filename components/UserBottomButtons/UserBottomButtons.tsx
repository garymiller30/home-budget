import { Box, Button } from "@mui/material";
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
    <Box sx={{ width: "100%", display: "flex" }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ width: "50%" }}
        onClick={handleDebitBtn}
      >
        ADD DEBIT
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ width: "50%", height: "50px" }}
        onClick={handleCreditBtn}
      >
        ADD CREDIT
      </Button>

      <ModalInputForm
        show={showModal}
        onClose={() => setShowModal(false)}
        title={title}
      >
        <InputForm type={inputType} userId={user._id} onClose={handleOnClose} />
      </ModalInputForm>
    </Box>
  );
}
