import classNames from 'classnames'
import { useRouter } from 'next/router'
import { BaseSyntheticEvent, ReactNode, useState } from 'react'
import menu from '../assets/menu.png'

const paths = [
  { name: 'Chess', path: '/' },
  { name: 'Duck', path: '/shoot-the-duck' },
  { name: 'Millionaire', path: '/millionaire' },
  { name: 'Image', path: '/image-zoom' }
]

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const { asPath, push } = useRouter()
  const [shouldAppear, setShouldAppear] = useState(false)

  const handleNavigation = (e: BaseSyntheticEvent) => {
    if (
      e.target.id !== 'menuIcon' &&
      e.target.id !== 'gameMenu' &&
      shouldAppear
    ) {
      setShouldAppear(false)
    }
  }

  return (
    <>
      <div className="relative" onClick={handleNavigation}>
        <button
          id="menuIcon"
          className={classNames('fixed left-3 z-40 outline-none', {
            'top-[60px]': asPath.includes('millionaire'),
            'top-[8%]': asPath === '/',
            'bottom-[60px]': asPath.includes('shoot-the-duck'),
            'bottom-[5px] sm:bottom-[60px]': asPath.includes('image-zoom')
          })}
          onClick={() => setShouldAppear(true)}
        >
          <img
            src={menu.src}
            alt=""
            className="w-10 sm:w-[60px] h-10 sm:h-[60px] bg-gray-200 rounded-full transition duration-200 active:scale-75"
          />
        </button>
        <div
          id="gameMenu"
          className={classNames(
            '-translate-y-[48px] w-full py-3 bg-gray-200 rounded-b',
            'flex justify-between items-center px-5 sm:px-10 fixed z-40 transition duration-300',
            {
              'translate-y-0': shouldAppear
            }
          )}
        >
          {paths.map(
            ({ name, path }: { name: string; path: string }, index) => {
              return (
                <button
                  key={index}
                  className="transition duration-300 hover:text-gray-700 hover:scale-125"
                  onClick={() => push(path)}
                >
                  {name}
                </button>
              )
            }
          )}
        </div>
        {children}
      </div>
    </>
  )
}
