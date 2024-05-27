/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ABA7",
        secondary: "#D1E5D8",
        tertiary: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
