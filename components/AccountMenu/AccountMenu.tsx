import { Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState } from "react";

type AppMenuProp = {
  open: boolean;
  close: () => void;
  anchor: any;
};
export default function AccountMenu({ open, close, anchor }: AppMenuProp) {
  return (
    <Menu open={open} anchorEl={anchor} onClose={close}>
      <MenuItem
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
}
