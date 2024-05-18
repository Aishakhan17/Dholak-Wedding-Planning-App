/** @type {import('tailwindcss').Config} */

import bg from "./src/assets/bg.jpg"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
        foreground: "#121212",
        background: "#0c0a09",
        white: "#FFF7ED",
        orange: "#f97316",
        card: "#262331",
        gradient1: "#1E293B",
        gradient2: "#334155",
        black: "#000000",
        cardTile: "#334155",
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

