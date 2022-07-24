//import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { AccountCircle } from "@mui/icons-material";
// import AppMenu from "../AppMenu/AppMenu";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
// import AccountMenu from "../AccountMenu/AccountMenu";

export default function UserAppBar() {
  const [anchorAppMenuBnt, setAnchorAppMenuBnt] = useState<null | HTMLElement>(
    null
  );
  const [anchorAccMenuBnt, setAnchorAccMenuBnt] = useState<null | HTMLElement>(
    null
  );

  const openAppMenu = Boolean(anchorAppMenuBnt);
  const openAccMenu = Boolean(anchorAccMenuBnt);

  const handleAppMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAppMenuBnt(event.currentTarget);
  };
  const handleAccMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccMenuBnt(event.currentTarget);
  };

  return (
    <Flex
      position="static"
      bgColor="royalblue"
      w="100%"
      h="3rem"
      alignItems="center"
      p={2}
    >
      <IconButton aria-label="appMenu" size="sm" icon={<HamburgerIcon />} />
      <Text fontSize="2xl" pl={2} color="yellow">
        Home Budget
      </Text>
      <Spacer />
      <Avatar size="sm" />
      {/* <Toolbar>
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
          open={openAppMenu}
          close={() => setAnchorAppMenuBnt(null)}
          anchor={anchorAppMenuBnt}
        />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home Budget
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-div"
            aria-haspopup="true"
            color="inherit"
            onClick={handleAccMenuClick}
          >
            <AccountCircle />
          </IconButton>
          <AccountMenu
            open={openAccMenu}
            close={() => setAnchorAccMenuBnt(null)}
            anchor={anchorAccMenuBnt}
          />
        </div>
      </Toolbar> */}
    </Flex>
  );
}
