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
import { useState } from "react";
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

  const handleDelete = async (t: iTransaction | undefined) => {
    if (t !== undefined) await controller.remove(t);
  };

  const handleEdit = async () => {
    //if (t !== undefined) await controller.edit(t);
  };

  function onSubmit(e: any) {}

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
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <InputElement />
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
              // onClick={}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
