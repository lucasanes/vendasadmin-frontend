import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 50,

  ".card": {
    width: "100%",
    maxWidth: "800px",
    paddingLeft: 10,
    paddingTop: 10,
  },

  ".buttons": {
    display: "flex",
    gap: 20,
    margin: "20px 0",
  },
});
