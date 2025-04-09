// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class", // ✅ Important for dark/light toggle to work
  plugins: [],
};
