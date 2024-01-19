/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
    
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["cmyk"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"),require('flowbite/plugin'),require("tw-elements/dist/plugin.cjs")],
}