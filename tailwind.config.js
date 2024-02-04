/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067ff",
        yellowColor: "#feb60d",
        purpleColor: "#9771ff",
        irisblueColor: "#01b5c5",
        headingColor: "#181a1e",
        textColor: "#4e545f",
      },
      boxShadow: {
        panelShadow: "rgba(17,12,46,0.15) 0px 40px 100px 0px;",
      },
    },
  },
  plugins: [],
};
