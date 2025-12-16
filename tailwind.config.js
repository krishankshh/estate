/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dc',
          300: '#dbd5c9',
          400: '#c1b7a3',
          500: '#a7987d',
          600: '#8d7f61',
          700: '#736649',
          800: '#5a4d35',
          900: '#403523',
        },
        accent: {
          50: '#fef9ee',
          100: '#fdf3dd',
          200: '#fbe7bb',
          300: '#f8db99',
          400: '#f4c355',
          500: '#f0ab11',
          600: '#d8990f',
          700: '#b4800d',
          800: '#90660a',
          900: '#754308',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(240, 171, 17, 0.3)',
      },
    },
  },
  plugins: [],
}
