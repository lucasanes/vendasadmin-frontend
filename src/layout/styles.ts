import { styled } from "../../stitches.config";

export const Container = styled("div", {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const Content = styled("div", {
  width: "100%",
  height: "calc(100% - 60px)",
});
