import { appTheme } from "./theme";

const breakpoint = 600;

export const centerAdjustWidthStyle = {
  alignSelf: "center",
  [appTheme.breakpoints.up(breakpoint)]: { maxWidth: breakpoint * 0.9 },
  [appTheme.breakpoints.down(breakpoint)]: { maxWidth: "90vw" },
};
