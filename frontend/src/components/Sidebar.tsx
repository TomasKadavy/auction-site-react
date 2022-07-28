import { Link, Outlet } from "react-router-dom";
import { Button, Stack, useMediaQuery } from "@mui/material";
import {
  sideBarStyle,
  sideButtonStyle,
  linkStyle,
} from "../styles/sidebarStyles";
import {
  AUCTIONS_CLOSED,
  AUCTIONS_MINE,
  AUCTIONS_MY_BID,
  AUCTIONS_WON,
  HOME,
} from "../constants/routes";
import { useContext } from "react";
import authContext from "../AuthContext";
import AddAuctionButton from "./AddAuctionButton";

function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 780px)");

  const { username } = useContext(authContext);

  return (
    <>
      <Stack direction="column" sx={sideBarStyle}>
        <Button variant="text" sx={sideButtonStyle} component={Link} to={HOME}>
          Všechny aukce
        </Button>
        <Button
          variant="text"
          sx={sideButtonStyle}
          component={Link}
          to={AUCTIONS_CLOSED}
        >
          Ukončené aukce
        </Button>

        {username != "" && !isMobile ? (
          <>
            <Button
              variant="text"
              sx={sideButtonStyle}
              component={Link}
              to={AUCTIONS_MINE}
            >
              Moje aukce
            </Button>
            <Button
              variant="text"
              sx={sideButtonStyle}
              component={Link}
              to={AUCTIONS_MY_BID}
            >
              Mé příhozy
            </Button>
            <Button
              variant="text"
              sx={sideButtonStyle}
              component={Link}
              to={AUCTIONS_WON}
            >
              Vítězné aukce
            </Button>
          </>
        ) : (
          username != "" &&
          isMobile && (
            <Button
              variant="text"
              sx={sideButtonStyle}
              component={Link}
              to={AUCTIONS_WON}
            >
              Vítězné aukce
            </Button>
          )
        )}

        {username !== "" && !isMobile ? <AddAuctionButton /> : <></>}
      </Stack>
      <Outlet />
    </>
  );
}

export default Sidebar;
