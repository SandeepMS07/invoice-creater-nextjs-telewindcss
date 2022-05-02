module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkViolet: "#17013b",
        eastSide: "#b29dd4",
      },
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "760px",
      // => @media (min-width: 960px) { ... }

      lg: "1240px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
