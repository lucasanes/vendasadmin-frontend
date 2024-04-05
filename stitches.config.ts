import { createStitches } from "@stitches/react";

export const { theme, styled, css, keyframes, createTheme } = createStitches({
  theme: {
    colors: {
      body: "#121214",
      content: "#212225",
      modal: "#f4f5f6e9",

      border: "#C4C4C4",

      hiContrast: "#FFFFFF",
      midContrast: "#EEEEEE",
      loContrast: "#A7A6A6",

      icons: "hsl(206,10%,35%)",

      pallet: "#4caf50",

      scrollbar: "#383B41",
      scrollbarThumb: "#5D6069",
    },
  },
  media: {
    sm: "(max-width: 550px)",
    md: "(max-width: 800px)",
    lg: "(max-width: 1000px)",
    xlg: "(max-width: 1200px)",
  },
});
