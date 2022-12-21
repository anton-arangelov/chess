/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'scale-in-out': {
          '50%': {
            scale: '150%',
            'z-index': 10
          },
          '100%': {
            scale: '100%'
          }
        }
      },
      animation: {
        'bounce-in-out': 'scale-in-out 0.3s cubic-bezier(0, 0, 0.2, 1)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
