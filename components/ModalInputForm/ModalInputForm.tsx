import {
  Box,
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
  colorScheme?: string;
  onClose: () => void;
};
export default function ModalInputForm({
  children,
  title,
  isOpen,
  colorScheme,
  onClose,
}: ModalInputFormProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box textColor={colorScheme}>{title}</Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
