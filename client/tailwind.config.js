{import('tailwindcss').Config} 

import bg from "./src/assets/bg.jpg"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
        foreground: "#080401",
        background: "#0c0a09",
        white: "#EEEEF0",
        orange: "#091f2A",
        card: "#091f2A",
        gradient1: "#1E293B",
        gradient2: "#334155",
        black: "#000000",
        cardTile: "#54798E",
    },
    fontFamily: {
        "sans": "Georgia",
    },
    extend: {
        spacing: {
        '2/3': '90%',
        '1/3': "10%"
      }
    },
    corePlugins: {
        aspectRatio: false,
    },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
    }
}

