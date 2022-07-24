import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalInputFormProps = {
  children?: any;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};
export default function ModalInputForm({
  children,
  title,
  isOpen,
  onClose,
}: ModalInputFormProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
