import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

type AppMenuProp = {
  open: boolean;
  close: () => void;
  anchor: any;
};

export default function AppMenu({ open, close, anchor }: AppMenuProp) {
  return (
    <Menu open={open} anchorEl={anchor} onClose={close}>
      <MenuItem>Price of unit</MenuItem>
    </Menu>
  );
}
