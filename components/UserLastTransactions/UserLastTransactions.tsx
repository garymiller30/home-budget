import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";
import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { filteredTransactions } from "@/recoil/selectors/filteredTransactions";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import InputElement from "../Forms/InputElement";
import UserLastTransactionList from "./UserLastTransactionList";

export default function UserLastTransactions() {
  const delDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();
  const [transaction, setTransaction] = useState<iTransaction | undefined>(
    undefined
  );

  const controller = useTransactionController();
  const transactions = useRecoilValue(filteredTransactions);

  const inputRef = useRef(null);

  function onEditHandle(t: iTransaction) {
    setTransaction(t);
    editDisclosure.onOpen();
  }

  const handleDelete = async (t: iTransaction | undefined) => {
    if (t !== undefined) await controller.remove(t);
  };

  async function onSubmit(e: any) {
    e.preventDefault();

    try {
      if (!transaction) throw new Error("transaction is empty");

      await controller.edit(transaction._id, {
        description: e.target.description.value.trim(),
        amount: e.target.amount.value,
        comment: e.target.comment.value.trim(),
      });
      editDisclosure.onClose();
    } catch (err) {}
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
      <UserLastTransactionList
        transactions={transactions}
        onEdit={onEditHandle}
      />
      <Modal
        isOpen={delDisclosure.isOpen}
        onClose={delDisclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              onClick={() => {
                handleDelete(transaction);
                delDisclosure.onClose();
              }}
            >
              Yes!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="input-form" ref={inputRef} onSubmit={onSubmit}>
              <Stack spacing={2}>
                <InputElement transaction={transaction} />
                <Spacer />
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <IconButton
              w="50%"
              ml={5}
              mr={5}
              aria-label="delete"
              icon={<DeleteIcon />}
              onClick={delDisclosure.onOpen}
            />
            <IconButton
              ml={5}
              mr={5}
              w="50%"
              aria-label="add"
              icon={<EditIcon />}
              type="submit"
              form="input-form"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
