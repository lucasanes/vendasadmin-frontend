import { Table } from "@nextui-org/react";
import { styled } from "../../../../../../stitches.config";

export const Container = styled(Table, {
  ".overflow-auto": {
    overflow: "auto",
  },

  ".nameCell": {
    textTransform: "capitalize",
  },

  ".buttonsCell": {
    display: "flex",
    gap: "20px",
  },
});
