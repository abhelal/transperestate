/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }
      laptop: "1280px",
      // => @media (min-width: 1280px) { ... }
      desktop: "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        primary: {
          50: "#ffdece",
          100: "#ffbd9d",
          200: "#ff9c6c",
          300: "#ff7a3a",
          400: "#ff6a22",
          500: "#FF5A0A",
          600: "#e55109",
        },
        secondary: {
          400: "#9B9B9B",
          700: "#334155",
          800: "#1e293b",
          900: "#1B1B1B",
        },
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
  plugins: [],
};
