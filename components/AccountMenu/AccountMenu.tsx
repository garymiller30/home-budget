import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function AccountMenu() {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        icon={<Avatar size="sm" />}
        bg="transparent"
      />
      <MenuList>
        <MenuItem
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
