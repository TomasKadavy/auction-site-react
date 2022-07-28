import { useContext, useState } from "react";
import authContext from "../AuthContext";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGIN } from "../constants/routes";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import StorageIcon from "@mui/icons-material/Storage";
import AddCardIcon from "@mui/icons-material/AddCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { acountButtonStyle } from "../styles/headerStyles";
import Box from "@mui/material/Box";
import { AUCTIONS_MINE, AUCTIONS_MY_BID } from "../constants/routes";
import DialogContent from "@mui/material/DialogContent";
import AddAuctionForm from "./forms/AddAuctionForm";
import Dialog from "@mui/material/Dialog";

function ProfileMenu() {
  const { username, logout } = useContext(authContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openAddAuctionDialog, setOpenAddAuctionDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenAddAuctionDialog(!openAddAuctionDialog);
  };

  const loginButton = (
    <Box sx={acountButtonStyle}>
      <Button
        component={Link}
        to={LOGIN}
        size="large"
        startIcon={<PersonIcon />}
      >
        Příhlásit se
      </Button>
    </Box>
  );

  const logoutButton = (
    <>
      <Box sx={acountButtonStyle}>
        <Button onClick={handleClick} size="large" startIcon={<PersonIcon />}>
          {username}
        </Button>
      </Box>
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
        <MenuItem>
          <Link
            to={AUCTIONS_MINE}
            style={{ textDecoration: "none", color: "black" }}
          >
            <StorageIcon /> Moje Aukce
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to={AUCTIONS_MY_BID}
            style={{ textDecoration: "none", color: "black" }}
          >
            <AttachMoneyIcon /> Moje Příhozy
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClickOpenDialog}>
          <AddCardIcon /> Vytvořit Aukci
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Odhlásit
        </MenuItem>
      </Menu>
      <Dialog open={openAddAuctionDialog} onClose={handleClickOpenDialog}>
        <DialogContent>
          <AddAuctionForm />
        </DialogContent>
      </Dialog>
    </>
  );

  if (username == "") {
    return loginButton;
  }

  return (
    <Stack direction="row" spacing={2} alignContent="center">
      {logoutButton}
    </Stack>
  );
}

export default ProfileMenu;
