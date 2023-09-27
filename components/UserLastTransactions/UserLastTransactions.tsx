import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";
import {
  Box,
  CircularProgress,
  IconButton,
  List,
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
import UserLastTransactionsItem from "./UserLastTransactionsItem";
import { useRecoilValue } from "recoil";
import { filteredTransactions } from "@/recoil/selectors/filteredTransactions";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import InputElement from "../Forms/InputElement";

export default function UserLastTransactions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [transaction, setTransaction] = useState<iTransaction | undefined>(
    undefined
  );

  const controller = useTransactionController();
  const transactions = useRecoilValue(filteredTransactions);

  const inputRef = useRef(null);

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
      onCloseEdit();
    } catch (err) {}
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
      <List>
        {transactions.map((item) => {
          return (
            <UserLastTransactionsItem
              key={item._id}
              item={item}
              onDelete={(t) => {
                setTransaction(t);
                onCloseEdit();
                onOpen();
              }}
              onEdit={(t) => {
                setTransaction(t);
                onOpenEdit();
              }}
            />
          );
        })}
      </List>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              onClick={() => {
                handleDelete(transaction);
                onClose();
              }}
            >
              Yes!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
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
              onClick={onOpen}
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
