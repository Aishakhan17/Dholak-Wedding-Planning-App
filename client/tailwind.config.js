/** @type {import('tailwindcss').Config} */

import bg from "./src/assets/bg.jpg"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
        foreground: "#292524",
        background: "#0c0a09",
        white: "white",
        orange: "#f97316",
        card: "#292524",
    },
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

