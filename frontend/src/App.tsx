import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Auction from "./components/Auction";
import RegisterPage from "./components/forms/RegisterPage";
import Header from "./components/Header";
import { Box, ThemeProvider } from "@mui/material";
import { appTheme } from "./styles/theme";
import {
  AUCTION_DETAIL,
  AUCTIONS_CLOSED,
  AUCTIONS_MINE,
  AUCTIONS_MY_BID,
  AUCTIONS_WON,
  HOME,
  LOGIN,
  REGISTER,
} from "./constants/routes";
import LoginPage from "./components/forms/LoginPage";
import AuctionsMenu from "./components/AuctionsMenu";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Header />
        <Box className="content">
          <Routes>
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={REGISTER} element={<RegisterPage />} />
            <Route path="/" element={<Sidebar />}>
              <Route path={HOME} element={<AuctionsMenu path={HOME} />} />
              <Route
                path={AUCTIONS_MINE}
                element={<AuctionsMenu path={AUCTIONS_MINE} />}
              />
              <Route
                path={AUCTIONS_CLOSED}
                element={<AuctionsMenu path={AUCTIONS_CLOSED} />}
              />
              <Route
                path={AUCTIONS_WON}
                element={<AuctionsMenu path={AUCTIONS_WON} />}
              />
              <Route
                path={AUCTIONS_MY_BID}
                element={<AuctionsMenu path={AUCTIONS_MY_BID} />}
              />
              <Route path={AUCTION_DETAIL} element={<Auction />} />
              <Route path="*" element={<div>Not found</div>} />
            </Route>
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
