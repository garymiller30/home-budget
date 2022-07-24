import { CloseIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import s from "./ModalInputForm.module.css";

interface ModalInputFormProps {
  show: boolean;
  onClose: () => void;
  children?: any;
  title: string;
}
export default function ModalInputForm({
  show,
  onClose,
  children,
  title,
}: ModalInputFormProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  function handleCloseClick(e: any) {
    e.preventDefault();
    onClose();
  }

  const modalContent = show ? (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <div className={s.header}>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleCloseClick} />
        </div>

        {title && (
          <Text fontSize="2xl" textAlign="center" pb={4}>
            {title}
          </Text>
        )}
        {children}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as HTMLElement
    );
  } else {
    return null;
  }
}
