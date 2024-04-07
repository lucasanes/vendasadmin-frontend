import { globalCss } from "@stitches/react";

export const GlobalStyles = globalCss({
  ":root": {},

  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "Poppins",
    "::-webkit-scrollbar": {
      backgroundColor: "$scrollbar",
      width: "7px",
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "$scrollbarThumb",
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
      position: "relative",
      top: "64px",
    },
  },

  form: {
    width: "100%",
    height: "100%",
  },

  body: {
    width: "100vw",
    height: "100vh",
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundColor: "$body",
    overflow: "hidden",
    position: "fixed",
  },

  ".pallet": {
    color: "$pallet",
  },

  button: {
    cursor: "pointer",
  },

  "button:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  "input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill":
    {
      transition: "0s 50000s",
    },

  "input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
  },

  "input[type=number]": {
    "-moz-appearance": "textfield",
    appearance: "textfield",
  },
});
