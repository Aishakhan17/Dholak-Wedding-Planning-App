/** @type {import('tailwindcss').Config} */

import bg from "./src/assets/bg.jpg"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
        "sans": "Georgia",
    },
    extend: {
    },
    corePlugins: {
        aspectRatio: false,
    },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
    }
}

