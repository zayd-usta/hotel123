import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";

const colors = {
  light: {
    primary: "#407EC9",
    secondary: "#365275",
    defaultBG: "rgb(93, 104, 110)",
    content_dark: "#000000FF",
    content_white: "#FFFFFFFF",
  },
};

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1200px",
          "2xl": "1440px",
          "3xl": "1680px",
        },
      },
    },
  },
  darkMode: ["class", "class"],
  plugins: [
    createThemes(
      ({ light }) => ({
        light: light(colors.light),
      }),
      { defaultTheme: "light" }
    ),
  ],
};
export default config;
