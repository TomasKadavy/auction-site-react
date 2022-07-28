import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../models/fetcher";
import Box from "@mui/material/Box";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import {
  productPage,
  productPlace,
  productWindow,
} from "../styles/auctionStyles";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IAuction } from "./AuctionsList";
import axios from "axios";
import { apiGetAuction, apiPostMakeBid } from "../constants/endpoints";
import authContext from "../AuthContext";
import { headers } from "../constants/headers";
import { dateWithinBoundaries, formatDate } from "../utils/dateFormatter";

function Auction() {
  const isMobile = useMediaQuery("(max-width: 780px)");

  const { username } = useContext(authContext);

  const [bid, setBid] = useState("");
  const { auctionId } = useParams();
  const realId: string = auctionId ? auctionId : "";
  const { data, error } = useSWR(apiGetAuction(realId), fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const auction: IAuction = data;

  const addBid = async () => {
    console.log(bid);
    if (isNaN(parseInt(bid))) {
      alert("Nene, musí to být číslo!");
      setBid("");
      return;
    }

    if (Math.sign(parseInt(bid)) !== 1) {
      alert("Nene, musí to nenulové kladné číslo!");
      setBid("");
      return;
    }

    const values = {
      price: parseInt(bid),
      user_name: username,
      auction_id: parseInt(realId),
    };

    try {
      await axios.post(apiPostMakeBid, values, headers);
      await mutate(apiGetAuction(realId));
    } catch (error: any) {
      alert("Bohužel, příhoz musí být větší než aktualní částka.");
    }

    setBid("");
  };

  const auctionIsNowHappening = dateWithinBoundaries(
    new Date(),
    auction.start_time,
    auction.end_time
  );

  const firstCol = (
    <>
      <CardMedia
        component="img"
        sx={{
          height: isMobile ? "15rem" : "100%",
          width: isMobile ? "92%" : "100%",
          objectFit: "fill",
          borderRadius: "0.5rem",
        }}
        image={auction.picture_url}
        alt={"Product picture"}
      />
      <Box
        sx={{
          border: "2px solid white",
          borderRadius: "0.5rem",
          textAlign: "justify",
          padding: "0.7rem",
          margin: "auto",
        }}
        width={isMobile ? "86%" : "94%"}
        height="50%"
      >
        <Typography component="div" variant="h6">
          {auction.name}
        </Typography>
        <Typography component="div" variant="body2">
          {auction.product_info}
        </Typography>
      </Box>
    </>
  );

  const secondCol = (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="div" variant="h5">
          Status:
        </Typography>
        <Typography component="div" variant="h6">
          Aukci vede {data.leader_name === null ? "nikdo" : data.leader_name}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="div" variant="h5">
          Vyvolávací cena:
        </Typography>
        <Typography component="div" variant="h6">
          {auction.start_price} Kč
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="div" variant="h5">
          Aktuální částka:
        </Typography>
        <Typography component="div" variant="h6">
          {auction.current_price} Kč
        </Typography>
      </Stack>
      {username !== "" ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="div" variant="h5">
            Příhoz:
          </Typography>
          <TextField
            id="outlined-number"
            type="number"
            size="small"
            sx={{
              width: "8rem",
              border: "2px solid white",
              borderRadius: "0.5rem",
              input: { color: "white" },
            }}
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            disabled={!auctionIsNowHappening}
          />
          <Button
            variant="contained"
            onClick={() => {
              addBid();
            }}
            sx={{
              color: "white",
              border: "2px solid white",
            }}
            disabled={!auctionIsNowHappening}
          >
            Přihodit
          </Button>
        </Stack>
      ) : (
        <></>
      )}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="div" variant="h5">
          Aukce začíná:
        </Typography>
        <Typography component="div" variant="h6">
          {formatDate(auction.start_time)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="div" variant="h5">
          Aukce končí:
        </Typography>
        <Typography component="div" variant="h6">
          {formatDate(auction.end_time)}
        </Typography>
      </Stack>
    </>
  );

  return (
    <Box sx={productPage}>
      <Stack direction="column" sx={productPlace}>
        <Stack sx={productWindow}>
          <Stack
            direction="column"
            width={isMobile ? "100%" : "50%"}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            marginBottom={isMobile ? "1rem" : "0%"}
          >
            {firstCol}
          </Stack>
          <Stack
            direction="column"
            width={isMobile ? "90%" : "50%"}
            justifyContent="flex-start"
            alignContent="center"
            spacing={isMobile ? 2 : 4}
            sx={{
              marginLeft: isMobile ? "0" : "1rem",
              padding: isMobile ? "0" : "1rem",
            }}
          >
            {secondCol}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Auction;
