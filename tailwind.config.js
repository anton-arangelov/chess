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
        },
        'slide-in-out-one': {
          '50%': {
            transform: 'translate(240px, 200%)'
          },
          '100%': {
            transform: 'translateX(480px)'
          }
        },
        'slide-in-out-two': {
          '10%': {
            transform: 'translate(48px, -50%)'
          },
          '60%': {
            transform: 'translate(288px, 300%)'
          },
          '100%': {
            transform: 'translateX(480px)'
          }
        },
        'slide-in-out-three': {
          '50%': {
            transform: 'translate(200%, 240px)'
          },
          '100%': {
            transform: 'translateX(480px)'
          }
        },
        'slide-in-out-four': {
          '10%': {
            transform: 'translate(48px, 100%)'
          },
          '30%': {
            transform: 'translate(144px, -60%)'
          },
          '50%': {
            transform: 'translate(240px, 100%)'
          },
          '70%': {
            transform: 'translate(336px, -60%)'
          },
          '90%': {
            transform: 'translate(432px, 100%)'
          },
          '100%': {
            transform: 'translateX(480px)'
          }
        }
      },
      animation: {
        'bounce-in-out': 'scale-in-out 0.3s cubic-bezier(0, 0, 0.2, 1)',
        'slide-one': 'slide-in-out-one 2s linear infinite',
        'slide-two': 'slide-in-out-two 2s linear infinite',
        'slide-three': 'slide-in-out-three 2s linear infinite',
        'slide-four': 'slide-in-out-four 2s linear infinite'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
