import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import AppMenu from "../AppMenu/AppMenu";
import { useState } from "react";

export default function UserAppBar() {
  const [anchorAppMenuBnt, setAnchorAppMenuBnt] = useState<null | HTMLElement>(
    null
  );

  const open = Boolean(anchorAppMenuBnt);

  const handleCloseAppMenu = () => {
    setAnchorAppMenuBnt(null);
  };

  const handleAppMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAppMenuBnt(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleAppMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <AppMenu
          open={open}
          close={handleCloseAppMenu}
          anchor={anchorAppMenuBnt}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home Budget
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
