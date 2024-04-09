import { Card } from "@nextui-org/react";
import { styled } from "../../../stitches.config";

export const Container = styled("div", {
  width: "100vw",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "50px 20px",
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
  width: "100%",
  maxWidth: "800px",

  ".form": {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  ".footer": {
    gap: 10,
    display: "flex",
  },
});
