import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ModalInputForm from "../ModalInputForm/ModalInputForm";
import PriceOfUnitComponent from "../PriceOfUnitComponent/PriceOfUnitComponent";

type AppMenuProp = {
  open: boolean;
  close: () => void;
  anchor: any;
};

export default function AppMenu({ open, close, anchor }: AppMenuProp) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <Menu open={open} anchorEl={anchor} onClose={close}>
        <MenuItem onClick={() => setOpenModal(true)}>Price of unit</MenuItem>
      </Menu>
      <ModalInputForm
        show={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title="Price of unit"
      >
        <PriceOfUnitComponent />
      </ModalInputForm>
    </>
  );
}
