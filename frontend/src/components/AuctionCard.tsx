import { IAuction } from "./AuctionsList";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { productFrameStyle, cardImageStyle } from "../styles/auctionStyles";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateFormatter";

function AuctionCard({
  id,
  name,
  product_info,
  start_time,
  end_time,
  start_price,
  current_price,
  picture_url,
  author_name,
  creation_time,
}: IAuction) {
  return (
    <>
      <Link to={`/auction/${id}`} style={{ textDecoration: "none" }}>
        <Card component="div" sx={productFrameStyle}>
          <Stack
            direction="row"
            spacing={0}
            justifyContent="space-between"
            alignItems="center"
            height="100%"
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <CardMedia
                component="img"
                image={picture_url}
                alt={picture_url}
                sx={cardImageStyle}
              />
              <Typography component="div" variant="h5" paddingLeft="0.3rem">
                {name}
              </Typography>
            </Stack>
            <Stack
              height="100%"
              width="50%"
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="div">&nbsp;</Typography>
              <Typography component="div" variant="h6">
                {current_price} Kč
              </Typography>
              <Typography component="div" variant="caption" paddingRight={2}>
                Do: {formatDate(end_time)}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Link>
    </>
  );
}

export default AuctionCard;
