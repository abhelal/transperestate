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
        primary: {
          50: colors.cyan[50],
          100: colors.cyan[100],
          200: colors.cyan[200],
          300: colors.cyan[300],
          400: colors.cyan[400],
          500: "#0E7490",
          600: colors.cyan[600],
          700: colors.cyan[700],
          800: colors.cyan[800],
          900: colors.cyan[900],
        },
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
