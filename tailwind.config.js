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
  },
  plugins: [require("@tailwindcss/forms")],
};
