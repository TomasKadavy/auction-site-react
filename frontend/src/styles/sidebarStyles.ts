export const sideBarStyle = {
  backgroundColor: "#514e5a",
  height: "100%",
  width: "15%",
  justifyContent: "flex-start",
  alignItems: "center",
  ["@media (max-width:780px)"]: {
    width: "100%",
    height: "3rem",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "0",
    gap: "0.5rem",
    position: "sticky",
    top: "5rem",
    zIndex: "100",
    margin: "0.2rem 0",
  },
};

export const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export const sideButtonStyle = {
  width: "95%",
  height: "3rem",
  marginTop: "1rem",
  backgroundColor: "#2388a9",
  color: "white",
  "&:hover": {
    backgroundColor: "#30abd5",
  },
  ["@media (max-width:780px)"]: {
    margin: "0",
    height: "100%",
  },
};
