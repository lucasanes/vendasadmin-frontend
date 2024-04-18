import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "50px 20px",
  overflowY: "auto",

  ".form": {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  ".card": {
    width: "100%",
    maxWidth: "800px",
  },

  ".buttons": {
    display: "flex",
    gap: 20,
  },
});
