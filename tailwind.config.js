/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fruit-pink': {
          50: '#fdf5f7',
          100: '#fceef3',
          500: '#f7a8c3',
          600: '#e698b3',
        },
        'fruit-purple': {
          50: '#f8f5fd',
          100: '#f3eefb',
          500: '#c7b0e6',
          600: '#b79dd8',
        },
        'fruit-peach': {
          50: '#fff7f5',
          100: '#fff0ed',
          500: '#ffc5b5',
          600: '#efb5a5',
        },
        'fruit-mint': {
          50: '#f2f9f7',
          100: '#e8f5f2',
          500: '#a8d8cc',
          600: '#98c8bc',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
