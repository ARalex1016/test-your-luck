/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(216, 14%, 7%)",
        primaryLight: "hsl(0, 0%, 14%)",
        secondary: "hsl(0, 0%, 100%)",
        accent: "hsl(210, 100%, 41%)",
      },
      spacing: {
        paddingX: "var(--paddingX)",
        menuHeight: "var(--menuHeight)",
      },
    },
  },
  plugins: [],
};
