import * as React from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import ListItemIcon from "@mui/material/ListItemIcon";
import s from "./UserMenu.module.css";
import { signOut } from "next-auth/react";
import DateNavigator from "../DateNavigator/DateNavigator";
import { iDate } from "../../interfaces/iDate";
import { iUser } from "../../interfaces/iUser";
import { Box } from "@mui/material";

interface UserMenuProps {
  user: iUser;
  date: iDate;
  onChangeDate: (d: iDate) => void;
}

export default function UserMenu({ user, date, onChangeDate }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemLogOut = (e: any) => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ flexGrow: 1, height: "100%", display: "flex" }}>
        <p className={s.user_name}>
          <img src={user.image as string} width={32} height={32} alt="avatar" />
          <span> {user.name}</span>
        </p>
      </Box>
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <DateNavigator date={date} />
      </Box>
      <Box sx={{ height: "100%", display: "flex" }}>
        <div className={s.menu_button}>
          <IconButton
            onClick={handleClick}
            size="small"
            //   sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem disabled={true}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuItemLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  );
}
