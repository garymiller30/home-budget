import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";
import {
  Box,
  List,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import UserLastTransactionsItem from "./UserLastTransactionsItem";
import { useRecoilValue } from "recoil";
import { filteredTransactions } from "@/recoil/selectors/filteredTransactions";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

export default function UserLastTransactions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [deletingTransaction, setdeletingTransaction] = useState<
    iTransaction | undefined
  >(undefined);

  const [editingTransaction, seteditingTransaction] = useState<
    iTransaction | undefined
  >(undefined);

  const controller = useTransactionController();
  const transactions = useRecoilValue(filteredTransactions);

  const handleDelete = async (t: iTransaction | undefined) => {
    if (t !== undefined) await controller.remove(t);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
      <List>
        {transactions.map((item) => {
          return (
            <UserLastTransactionsItem
              key={item._id}
              item={item}
              onDelete={(t) => {
                setdeletingTransaction(t);
                onOpen();
              }}
              onEdit={(t) => {
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
                handleDelete(deletingTransaction);
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
        </ModalContent>
      </Modal>
    </Box>
  );
}
