import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import s from "./ModalInputForm.module.css";

export default function ModalInputForm({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  function handleCloseClick(e) {
    e.preventDefault();
    onClose();
  }

  const modalContent = show ? (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <div className={s.header}></div>
        <a href="#" onClick={handleCloseClick}>
          x
        </a>
        {title && <div className={s.title}>{title}</div>}
        <div className={s.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
