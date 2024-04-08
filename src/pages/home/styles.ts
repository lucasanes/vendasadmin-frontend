import { styled } from "../../../stitches.config";

export const Container = styled("div", {
  width: "100%",
  height: "100%",
  overflowY: "auto",
  padding: "50px 20px",
});

export const Content = styled("div", {
  ".line": {
    margin: "10px 0",
    border: "1px solid #fff",
  },

  ".buttons": {
    display: "flex",
    margin: "20px 0",
    gap: 20,
  },

  a: {
    width: "185px",
  },

  h1: {
    fontSize: 24,
    fontWeight: 600,
  },

  span: {
    fontSize: 18,
  },

  "@sm": {
    ".buttons": {
      flexDirection: "column",
    },
  },
});
