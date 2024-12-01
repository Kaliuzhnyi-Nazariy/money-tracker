/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#0C0E24',
        second: '#2C1B8B',
      },
    },
  },
  plugins: [require('daisyui')],
}
