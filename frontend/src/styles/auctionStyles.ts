// Auctions menu
export const homeStyle = {
  height: "auto",
  width: "85%",
  backgroundColor: "#ffffff",
  ["@media (max-width:780px)"]: {
    width: "100%",
    margin: "0",
  },
};

// Auction card

export const productFrameStyle = {
  backgroundColor: "#2AA3CC;",
  borderRadius: "1rem",
  textDecoration: "none",
  width: "22rem",
  height: "6rem",
  margin: "0.2rem",
  "&:hover": {
    background: "#51b9db",
  },
};

export const cardImageStyle = {
  height: "100%",
  width: "6rem",
  objectFit: "contain",
  align: "left",
  background: "#2282a3",
};

// Auction list

export const cardWrapper = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  placeContent: "center",
  gap: "1rem",
  paddingTop: "1rem",
};

export const productPage = {
  height: "90vh",
  width: "85%",
  backgroundColor: "white",
  color: "white",
  ["@media (max-width:780px)"]: {
    width: "100%",
    margin: "0",
    height: "100%",
  },
};

// Auction

export const productPlace = {
  margin: "auto",
  width: "60%",
  height: "auto",
  ["@media (max-width:780px)"]: {
    width: "100%",
    height: "auto",
    margin: "auto",
  },
};

export const productWindow = {
  flexDirection: "row",
  borderRadius: "1rem",
  border: "5rem",
  padding: "2rem",
  marginTop: "2rem",
  backgroundColor: "#2388a9",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  ["@media (max-width:780px)"]: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    border: "0",
    padding: "1rem 0",
    margin: "0",
    marginBottom: "0.5rem",
    justifyContent: "flex-start",
    alignItems: "center",
  },
};
