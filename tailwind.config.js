/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
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
        dark: "#081524",
        "dark-bg": "#1E293B",
        light: "#f9f9f9",
        "light-bg": "#f2f2f2",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
