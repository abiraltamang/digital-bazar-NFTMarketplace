/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002F5B",
        secondary: "#D8D8DC",
        tertiary: "#2E97A7",
      },
    },
  },
  plugins: [],
};
