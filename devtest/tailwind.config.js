/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        parcoBlue: "#0671AD",
        dropBlue: "#3498DB",
        parcoGreen: "#60BE64",
        parcoRed: "#FD5C70",
      },
    },
  },
  plugins: [],
};
