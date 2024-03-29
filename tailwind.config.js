/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  purge: [
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '768px',
        md: '1024px',
        lg: '1440px',
        'xs-only': { max: '767px' }
      },
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
        //For xs screens
        'slide-in-out-xs-one': {
          '50%': {
            transform: 'translate(220px, 400%)'
          },
          '100%': {
            transform: 'translateX(440px)'
          }
        },
        'slide-in-out-xs-two': {
          '10%': {
            transform: 'translate(44px, -50%)'
          },
          '60%': {
            transform: 'translate(264px, 300%)'
          },
          '100%': {
            transform: 'translateX(440px)'
          }
        },
        'slide-in-out-xs-three': {
          '50%': {
            transform: 'translate(300%, 240px)'
          },
          '100%': {
            transform: 'translateX(440px)'
          }
        },
        'slide-in-out-xs-four': {
          '10%': {
            transform: 'translate(44px, 100%)'
          },
          '30%': {
            transform: 'translate(132px, -60%)'
          },
          '50%': {
            transform: 'translate(220px, 100%)'
          },
          '70%': {
            transform: 'translate(308px, -60%)'
          },
          '90%': {
            transform: 'translate(396px, 100%)'
          },
          '100%': {
            transform: 'translateX(440px)'
          }
        },
        'slide-in-out-xs-five': {
          '30%': {
            transform: 'translate(220px, 100%)'
          },
          '35%': {
            transform: 'translate(230px, 200%)'
          },
          '40%': {
            transform: 'translate(220px, 300%)'
          },
          '50%': {
            transform: 'translate(174px, 300%)'
          },
          '65%': {
            transform: 'translate(165px, 200%)'
          },
          '70%': {
            transform: 'translate(174px, 100%)'
          },
          '100%': {
            transform: 'translate(440px, 200%)'
          }
        },
        'slide-in-out-xs-six': {
          '20%': {
            transform: 'translate(88px, 500%)'
          },
          '40%': {
            transform: 'translate(176px, 450%)'
          },
          '60%': {
            transform: 'translate(264px, -50%)'
          },
          '80%': {
            transform: 'translate(352px, 300%)'
          },
          '100%': {
            transform: 'translate(440px, 200%)'
          }
        },
        'slide-in-out-xs-seven': {
          '35%': {
            transform: 'translate(312px, 100%)'
          },
          '70%': {
            transform: 'translate(74px, 150%)'
          },
          '100%': {
            transform: 'translate(440px, -50%)'
          }
        },
        'slide-in-out-xs-eight': {
          '30%': {
            transform: 'translate(183px, 100%)'
          },
          '60%': {
            transform: 'translate(183px, 500%)'
          },
          '100%': {
            transform: 'translate(440px, 100%)'
          }
        },
        'slide-in-out-xs-nine': {
          '30%': {
            transform: 'translate(-183px, 500%)'
          },
          '65%': {
            transform: 'translate(-275px, -30%)'
          },
          '100%': {
            transform: 'translate(-440px, 100%)'
          }
        },
        'slide-in-out-xs-ten': {
          '25%': {
            transform: 'translate(-138px, 350%)'
          },
          '35%': {
            transform: 'translate(-128px, 250%)'
          },
          '45%': {
            transform: 'translate(-138px, 150%)'
          },
          '55%': {
            transform: 'translate(-183px, 250%)'
          },
          '75%': {
            transform: 'translate(-275px, 350%)'
          },
          '100%': {
            transform: 'translate(-440px, 100%)'
          }
        },
        //For screens larger than xs
        'slide-in-out-one': {
          '50%': {
            transform: 'translate(240px, 400%)'
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
            transform: 'translate(300%, 240px)'
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
        },
        'slide-in-out-five': {
          '30%': {
            transform: 'translate(240px, 100%)'
          },
          '35%': {
            transform: 'translate(250px, 200%)'
          },
          '40%': {
            transform: 'translate(240px, 300%)'
          },
          '50%': {
            transform: 'translate(190px, 300%)'
          },
          '65%': {
            transform: 'translate(180px, 200%)'
          },
          '70%': {
            transform: 'translate(190px, 100%)'
          },
          '100%': {
            transform: 'translate(480px, 200%)'
          }
        },
        'slide-in-out-six': {
          '20%': {
            transform: 'translate(96px, 500%)'
          },
          '40%': {
            transform: 'translate(192px, 450%)'
          },
          '60%': {
            transform: 'translate(288px, -50%)'
          },
          '80%': {
            transform: 'translate(384px, 300%)'
          },
          '100%': {
            transform: 'translate(480px, 200%)'
          }
        },
        'slide-in-out-seven': {
          '35%': {
            transform: 'translate(340px, 100%)'
          },
          '70%': {
            transform: 'translate(80px, 150%)'
          },
          '100%': {
            transform: 'translate(480px, -50%)'
          }
        },
        'slide-in-out-eight': {
          '30%': {
            transform: 'translate(200px, 100%)'
          },
          '60%': {
            transform: 'translate(200px, 500%)'
          },
          '100%': {
            transform: 'translate(480px, 100%)'
          }
        },
        'slide-in-out-nine': {
          '30%': {
            transform: 'translate(-200px, 500%)'
          },
          '65%': {
            transform: 'translate(-300px, -30%)'
          },
          '100%': {
            transform: 'translate(-480px, 100%)'
          }
        },
        'slide-in-out-ten': {
          '25%': {
            transform: 'translate(-150px, 350%)'
          },
          '35%': {
            transform: 'translate(-140px, 250%)'
          },
          '45%': {
            transform: 'translate(-150px, 150%)'
          },
          '55%': {
            transform: 'translate(-200px, 250%)'
          },
          '75%': {
            transform: 'translate(-300px, 350%)'
          },
          '100%': {
            transform: 'translate(-480px, 100%)'
          }
        },
        'blink-success': {
          '0%': {
            backgroundColor: 'white'
          },
          '30%': {
            backgroundColor: 'rgb(30 58 138)'
          },
          '45%': {
            backgroundColor: 'green'
          },
          '60%': {
            backgroundColor: 'white'
          },
          '80%': {
            backgroundColor: 'green'
          },
          '90%': {
            backgroundColor: 'white'
          },
          '100%': {
            backgroundColor: 'green'
          }
        },
        'blink-failure': {
          '0%': {
            backgroundColor: 'white'
          },
          '30%': {
            backgroundColor: 'rgb(30 58 138)'
          },
          '45%': {
            backgroundColor: 'red'
          },
          '60%': {
            backgroundColor: 'white'
          },
          '80%': {
            backgroundColor: 'red'
          },
          '90%': {
            backgroundColor: 'white'
          },
          '100%': {
            backgroundColor: 'red'
          }
        },
        'blink-screen': {
          '0%': {
            backgroundColor: 'white'
          },
          '40%': {
            backgroundColor: 'rgb(0,128,0,0.6)'
          },
          '60%': {
            backgroundColor: 'white'
          },
          '80%': {
            backgroundColor: 'rgb(0,128,0,0.6)'
          },
          '90%': {
            backgroundColor: 'white'
          },
          '100%': {
            backgroundColor: 'rgb(0,128,0,0.6)'
          }
        },
        'audience-one': {
          '0%': {
            height: '0%'
          },
          '20%': {
            height: '40%'
          },
          '40%': {
            height: '0%'
          },
          '60%': {
            height: '90%'
          },
          '80%': {
            height: '40%'
          },
          '100%': {
            height: '65%'
          }
        },
        'audience-two': {
          '0%': {
            height: '0%'
          },
          '20%': {
            height: '80%'
          },
          '40%': {
            height: '10%'
          },
          '60%': {
            height: '30%'
          },
          '80%': {
            height: '10%'
          },
          '100%': {
            height: '40%'
          }
        },
        'audience-three': {
          '0%': {
            height: '0%'
          },
          '20%': {
            height: '40%'
          },
          '40%': {
            height: '80%'
          },
          '60%': {
            height: '30%'
          },
          '80%': {
            height: '60%'
          },
          '100%': {
            height: '50%'
          }
        },
        'audience-four': {
          '0%': {
            height: '0%'
          },
          '20%': {
            height: '50%'
          },
          '40%': {
            height: '30%'
          },
          '60%': {
            height: '70%'
          },
          '80%': {
            height: '20%'
          },
          '100%': {
            height: '60%'
          }
        }
      },
      animation: {
        'bounce-in-out': 'scale-in-out 0.3s cubic-bezier(0, 0, 0.2, 1)',
        'slide-xs-one': 'slide-in-out-xs-one 2s linear infinite',
        'slide-xs-two': 'slide-in-out-xs-two 2s linear infinite',
        'slide-xs-three': 'slide-in-out-xs-three 2s linear infinite',
        'slide-xs-four': 'slide-in-out-xs-four 2s linear infinite',
        'slide-xs-five': 'slide-in-out-xs-five 2s linear infinite',
        'slide-xs-six': 'slide-in-out-xs-six 2s linear infinite',
        'slide-xs-seven': 'slide-in-out-xs-seven 2s linear infinite',
        'slide-xs-eight': 'slide-in-out-xs-eight 2s linear infinite',
        'slide-xs-nine': 'slide-in-out-xs-nine 2s linear infinite',
        'slide-xs-ten': 'slide-in-out-xs-ten 2s linear infinite',
        'slide-one': 'slide-in-out-one 2s linear infinite',
        'slide-two': 'slide-in-out-two 2s linear infinite',
        'slide-three': 'slide-in-out-three 2s linear infinite',
        'slide-four': 'slide-in-out-four 2s linear infinite',
        'slide-five': 'slide-in-out-five 2s linear infinite',
        'slide-six': 'slide-in-out-six 2s linear infinite',
        'slide-seven': 'slide-in-out-seven 2s linear infinite',
        'slide-eight': 'slide-in-out-eight 2s linear infinite',
        'slide-nine': 'slide-in-out-nine 2s linear infinite',
        'slide-ten': 'slide-in-out-ten 2s linear infinite',
        'blink-success': 'blink-success 2s linear',
        'blink-failure': 'blink-failure 2s linear',
        'blink-screen': 'blink-screen 2s linear',
        'audience-one': 'audience-one 2s linear forwards',
        'audience-two': 'audience-two 2s linear forwards',
        'audience-three': 'audience-three 2s linear forwards',
        'audience-four': 'audience-four 2s linear forwards'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
