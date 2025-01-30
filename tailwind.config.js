// public/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js,css}",
    "./views/**/*.ejs", // Termasuk semua file EJS di dalam folder views
    "./src/**/*.{js,jsx,ts,tsx}", // Termasuk semua file JS di dalam folder views
  ],
  theme: {
    extend: {
      colors: {
        darkest: "#343a40",
        dark: "#495057",
        medium: "#ced4da",
        light: "#f1f3f5",
        theme: "#1098ad",
        accent: "#ffa94d",
      },
      fontFamily: {
        codystar: ['"Codystar"', "sans-serif"],
      },
      animation: {
        loader: "loader 1s infinite linear",
      },
      keyframes: {
        loader: {
          "20%": { backgroundPosition: "0% 0%, 50% 50%, 100% 50%" },
          "40%": { backgroundPosition: "0% 100%, 50% 0%, 100% 50%" },
          "60%": { backgroundPosition: "0% 50%, 50% 100%, 100% 0%" },
          "80%": { backgroundPosition: "0% 50%, 50% 50%, 100% 100%" },
        },
      },
    },
  },
  plugins: [],
};
