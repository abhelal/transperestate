/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.cyan,
        secondary: colors.gray,
        input: "#F2F2F2",
        light: "#F9F9F9",
        danger: {
          500: "#FF0A0A",
        },
        calm: {
          500: "#107CFB",
        },
        ash: {
          500: "#7F7F7F",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
