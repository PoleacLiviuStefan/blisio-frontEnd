/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
      'oldStandard': 'Old Standard TT, serif',
      'roboto': 'Roboto, sans-serif',
      'robotoMono':"Roboto Mono, monospace",
      'montSerrat':"Montserrat, sans-serif",
      'libre':"Libre Baskerville, serif",
      'garamond': "EB Garamond, serif",
      'fastHand': "Fasthand, cursive",
      'cursive':"Cookie, cursive",
      'dafoe': "Mr Dafoe, cursive",
      'norican' : "Norican, cursive",
      'oswald' : "Oswald, sans-serif"
    }},
  },
  plugins: [],
}