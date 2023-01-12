import classNames from 'classnames'
import fifty from '../assets/fifty-fifty.jpg'
import telephone from '../assets/telephone.jpg'
import audience from '../assets/audience.jpg'
import { NUMBERS } from '../config/constants'

type MillionaireMenuProps = {
  isEliminationUsed: boolean
  isTelephoneUsed: boolean
  isAudienceUsed: boolean
  questionLevel: number
  screenWidth: number
  isGameOver: boolean
  handleEliminationClick: () => void
  handleTelephoneClick: () => void
  handleAudienceClick: () => void
}

export const MillionaireMenu = ({
  isEliminationUsed,
  isTelephoneUsed,
  isAudienceUsed,
  questionLevel,
  screenWidth,
  isGameOver,
  handleEliminationClick,
  handleTelephoneClick,
  handleAudienceClick
}: MillionaireMenuProps) => {
  return (
    <>
      <div className="flex w-full justify-center pt-3">
        <button
          onClick={handleEliminationClick}
          className={classNames(
            'w-[60px] sm:w-[80px] h-[40px] sm:h-[55px] mr-2 sm:mr-10 cursor-pointer transition duration-200 hover:scale-125 hover:opacity-60 outline-none',
            {
              'opacity-60 pointer-events-none scale-75': isEliminationUsed
            }
          )}
        >
          <img src={fifty.src} alt="" />
        </button>
        <button
          onClick={handleTelephoneClick}
          className={classNames(
            'w-[60px] sm:w-[80px] h-[40px] sm:h-[55px] mr-2 sm:mr-10 cursor-pointer transition duration-200 hover:scale-125 hover:opacity-60 outline-none',
            {
              'opacity-60 pointer-events-none scale-75': isTelephoneUsed
            }
          )}
        >
          <img src={telephone.src} alt="" />
        </button>
        <button
          onClick={handleAudienceClick}
          className={classNames(
            'w-[60px] sm:w-[80px] h-[40px] sm:h-[55px] cursor-pointer transition duration-200 hover:scale-125 hover:opacity-60 outline-none',
            {
              'opacity-60 pointer-events-none scale-75': isAudienceUsed
            }
          )}
        >
          <img src={audience.src} alt="" />
        </button>
      </div>
      <div className="w-[240px] relative mt-3 sm:mt-5 ml-auto md:mr-10 bg-blue-100 text-center border-b border-black">
        {NUMBERS.map((el, index) => (
          <div
            className={classNames(
              'sm:text-xl h-[20px] sm:h-[25px] border-t border-x border-black relative flex items-center',
              {
                'bg-blue-200':
                  (index === 10 && questionLevel > 5) ||
                  (index === 5 && questionLevel > 10)
              }
            )}
            key={index}
          >
            <span
              className={classNames('z-10 w-full left-0', {
                'text-white': 15 - index === questionLevel,
                'transition duration-1000': questionLevel !== 1
              })}
            >
              {(index === 5 || index === 10) && (
                <span className={classNames('absolute left-2 top-[1px]')}>
                  *
                </span>
              )}
              {el.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}лв
            </span>
          </div>
        ))}
        <div
          style={{
            transform: `translateY(-${
              questionLevel * (screenWidth <= 767 ? 20 : 25)
            }px)`
          }}
          className={classNames(
            'absolute left-0 h-[20px] sm:h-[25px] w-[240px] bg-blue-900',
            {
              'transition duration-1000': questionLevel !== 1 || isGameOver
            }
          )}
        />
      </div>
    </>
  )
}
