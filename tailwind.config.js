/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#11175D",
      },
      fontFamily: {
        nunito: ["Nunito", "system-ui"],
      },
    },
  },
  plugins: [],
};
