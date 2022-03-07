const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        daybridge: "#594091",
      },
      gridAutoColumns: {
        roadmap: "var(--roadmap-column-width)",
      },
      gridAutoRows: {
        roadmap: "var(--roadmap-row-height)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
