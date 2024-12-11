/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        '24rem': '24rem', // Adds a custom max-width class
      },
    },
  },
  plugins: [],
};
