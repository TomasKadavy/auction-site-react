export const headerStyle = {
  height: "10vh",
  minHeight: "5rem",
  backgroundColor: "#2388a9",
  padding: "0 2rem 0 0",
  ["@media (max-width:780px)"]: {
    height: "4rem",
    maxWidth: "100vw",
    padding: "0 0 0 0",
    position: "sticky",
    top: "0px",
    zIndex: "100",
  },
};

export const headerBoxStyle = {
  height: "100%",
  alignContent: "center",
  display: "flex",
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "#2AA3CC",
  },
  ["@media (max-width:780px)"]: {
    width: "50%",
  },
};

export const noHighlightingStyle = {
  textDecoration: "none",
  margin: "auto",
  width: "auto",
  padding: "0 1rem",
  color: "white",
  "&:focus, &:hover, &:visited, &:link, &:active": {
    color: "white",
  },
  ["@media (max-width:780px)"]: {
    whitSpace: "nowrap",
    fontSize: "1.5rem",
    padding: "0 0 0 0.5rem",
  },
};

export const acountButtonStyle = {
  ["@media (max-width:780px)"]: {
    width: "50%",
    height: "100%",
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
};
