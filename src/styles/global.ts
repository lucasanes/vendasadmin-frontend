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
      position: "fixed",
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "$scrollbarThumb",
      borderRadius: "5px",
      position: "fixed",
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

  button: {
    cursor: "pointer",
  },

  "button:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, select:-webkit-autofill, select:-webkit-autofill:hover, select:-webkit-autofill:focus":
    {
      "-webkit-box-shadow": `0 0 0 30px ${"$.colors.loContrast"} inset`,
      "-webkit-text-fill-color": `${"$.colors.hiContrast"} !important`,
    },

  "input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
  },

  "input[type=number]": {
    "-moz-appearance": "textfield",
    appearance: "textfield",
  },
});
