/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "at-light-green": "#24958a",
        "at-light-green-2": "#33c3b4",
        "at-green": "#286d5d",
        "at-orange": "#f28231",
        "at-orange-light": "#f7ae79",
        "at-yellow": "#e5cc28",
        "at-yellow-light": "#eddc6c",
        "light-grey": "#f3f3f3",
        "at-grey": "#e7e7e7",
        "at-border": "#a0a0a0"
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  plugins: [],
}

