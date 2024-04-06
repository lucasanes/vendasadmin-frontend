import { Card } from "@nextui-org/react";
import { styled } from "../../../stitches.config";

export const Container = styled("div", {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",

  ".header": {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: "10px",

    h1: {
      fontSize: "26px",
    },
  },
});

export const CardComponent = styled(Card, {
  width: "500px",
});
