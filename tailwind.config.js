/** @type {import('tailwindcss').Config} */
const textShadow = require('tailwindcss-textshadow')

module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      textShadow: {
        default: '1px 1px 2px rgba(0,0,0,0.8)',
        lg: '2px 2px 4px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [textShadow],
}
