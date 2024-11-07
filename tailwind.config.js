/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#edf0ff',
          500: '#a5b4fc',
          600: '#8098f9',
          700: '#6d85f6',
        },
        secondary: {
          50: '#fff7f5',
          100: '#ffefeb',
          500: '#ffa69e',
          600: '#ff9389',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
