import { Navbar } from "@nextui-org/react";
import { styled } from "../../../stitches.config";

export const Container = styled(Navbar, {
  background: "$content",
  ".toggle": {
    display: "none",
  },

  "@md": {
    ".toggle": {
      display: "flex",
    },

    ".buttons": {
      display: "none",
    },
  },
});
