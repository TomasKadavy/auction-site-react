import Box from "@mui/material/Box";
import { homeStyle } from "../styles/auctionStyles";
import AuctionsList from "./AuctionsList";

interface Props {
  path: string;
}

function AuctionsMenu({ path }: Props) {
  return (
    <Box sx={homeStyle}>
      <AuctionsList path={path} />
    </Box>
  );
}

export default AuctionsMenu;
