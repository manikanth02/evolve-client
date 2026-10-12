/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F6F3',
          100: '#DCECE3',
          200: '#BBDAC9',
          300: '#91C2A7',
          400: '#5FA380',
          500: '#3D8661',
          600: '#2C6A4C',
          700: '#21533C',
          800: '#1A4331',
          900: '#0F281E',
          950: '#071610',
        },
        gold: {
          50: '#FDFBF4',
          100: '#FAF5E3',
          200: '#F4E9C1',
          300: '#ECDA97',
          400: '#E2C76A',
          500: '#D4AF37', // Brand Signature Gold
          600: '#B89224',
          700: '#91711A',
          800: '#735818',
          900: '#5C4616',
          950: '#342609',
        },
        cream: {
          50: '#FCFAF6',
          100: '#F8F4EC',
          200: '#F0E8D7',
          300: '#E6D7BD',
          400: '#D6C09D',
          500: '#C2A77E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #071610 0%, #0F281E 60%, #1A4331 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F4E9C1 0%, #D4AF37 50%, #B89224 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FCFAF6 0%, #F8F4EC 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'forest-deep': '0 20px 40px -15px rgba(7, 22, 16, 0.6)',
      }
    },
  },
  plugins: [],
}
