import { Grid, Typography } from "@mui/material";
import {
  headerStyle,
  noHighlightingStyle,
  headerBoxStyle,
} from "../styles/headerStyles";
import { Link } from "react-router-dom";
import { HOME } from "../constants/routes";
import ProfileMenu from "./ProfileMenu";
import { Box } from "@mui/material";

function Header() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={headerStyle}
    >
      <Box sx={headerBoxStyle}>
        <Typography
          variant="h3"
          component={Link}
          to={HOME}
          sx={noHighlightingStyle}
        >
          Elektronická aukce
        </Typography>
        <Box
          style={{
            borderLeft: "3px solid #ffffff",
            height: "40%",
            margin: "auto",
            alignSelf: "flex-start",
          }}
        />
      </Box>
      <ProfileMenu />
    </Grid>
  );
}

export default Header;
