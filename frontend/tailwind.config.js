/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mgreen': '#6EC246',
        'mgray': '#626262',
        'mcgray': '#303030',
        'mcblack': '#181818'
      },
      spacing: {
        '192': '48rem',
      },
      fontFamily: {
        calibri: ['Calibri', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
}

