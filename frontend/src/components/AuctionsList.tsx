import useSWR from "swr";
import fetcher from "../models/fetcher";
import AuctionCard from "./AuctionCard";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { cardWrapper } from "../styles/auctionStyles";
import {
  apiGetAuctions,
  apiGetAuctionsByLeader,
  apiGetAuctionsOwnedByUser,
  apiGetAuctionsWhereUserHasABid,
} from "../constants/endpoints";
import {
  AUCTIONS_CLOSED,
  AUCTIONS_MINE,
  AUCTIONS_MY_BID,
  AUCTIONS_WON,
} from "../constants/routes";
import authContext from "../AuthContext";

export interface IAuction {
  id: number;
  name: string;
  product_info: string;
  start_time: Date;
  end_time: Date;
  start_price: number;
  current_price: number;
  picture_url: string;
  author_name: string;
  creation_time: Date;
  leader_name: string;
}

interface Props {
  path: string;
}

function AuctionsList(props: Props) {
  const { username } = useContext(authContext);

  let filterAuctions: string = apiGetAuctions();

  if (props.path == AUCTIONS_MINE) {
    filterAuctions = apiGetAuctionsOwnedByUser(username);
  } else if (props.path == AUCTIONS_CLOSED) {
    filterAuctions = apiGetAuctions("past");
  } else if (props.path == AUCTIONS_MY_BID) {
    filterAuctions = apiGetAuctionsWhereUserHasABid(username);
  } else if (props.path == AUCTIONS_WON) {
    filterAuctions = apiGetAuctionsByLeader(username);
  }

  const { data, error } = useSWR(filterAuctions, fetcher);
  if (error) return <Box sx={cardWrapper}>Failed to load auctions</Box>;
  if (!data) return <Box sx={cardWrapper}>Loading auctions ...</Box>;
  const auctions: IAuction[] = data;

  return (
    <Box sx={cardWrapper}>
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} {...auction} />
      ))}
    </Box>
  );
}

export default AuctionsList;
