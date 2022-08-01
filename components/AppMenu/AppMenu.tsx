import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import ModalInputForm from "../ModalInputForm/ModalInputForm";
import PriceOfUnitComponent from "../PriceOfUnitComponent/PriceOfUnitComponent";

export default function AppMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon color="white" />}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        />
        <MenuList>
          <MenuItem onClick={onOpen}>Price of unit</MenuItem>
        </MenuList>
      </Menu>
      <ModalInputForm isOpen={isOpen} onClose={onClose} title="Price of unit">
        <PriceOfUnitComponent />
      </ModalInputForm>
    </>
  );
}
