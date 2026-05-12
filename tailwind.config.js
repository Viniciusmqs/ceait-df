/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: '#0D2D6B', dark: '#071a42', light: '#1a4a9e' },
        green: { DEFAULT: '#1A9B3C', dark: '#0f6326', light: '#22c44d', pale: '#e6f7eb' },
        gold:  { DEFAULT: '#F5C800', dark: '#c9a400', light: '#fdd835' },
        sky:   { DEFAULT: '#47B4E8', pale: '#e8f6fd' },
        ink:   '#0A0F1E',
        muted: '#64748b',
        base:  '#F7F8FC',
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['Inter', '"Barlow"', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        hover: '0 8px 32px rgba(0,0,0,0.12)',
        hero: '0 4px 40px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
