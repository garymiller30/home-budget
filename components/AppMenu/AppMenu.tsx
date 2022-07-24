import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import ModalInputForm from "../ModalInputForm/ModalInputForm";
import PriceOfUnitComponent from "../PriceOfUnitComponent/PriceOfUnitComponent";

export default function AppMenu() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <Menu isLazy>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} bg="transparent" />
        <MenuList>
          <MenuItem onClick={() => setOpenModal(true)}>Price of unit</MenuItem>
        </MenuList>
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
