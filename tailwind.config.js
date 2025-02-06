// public/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './public/**/*.{html,js,css}',
    './src/**/*.{js,jsx,ts,tsx}', // Termasuk semua file JS di dalam folder views
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    extend: {
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
