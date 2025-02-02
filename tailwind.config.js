// public/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js,css}",
    "./src/**/*.{js,jsx,ts,tsx}", // Termasuk semua file JS di dalam folder views
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
