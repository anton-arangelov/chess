import classNames from 'classnames'
import fifty from '../assets/fifty-fifty.jpg'
import telephone from '../assets/telephone.jpg'
import audience from '../assets/audience.jpg'
import { NUMBERS } from '../config/constants'
import { useEffect, useState } from 'react'

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
  const [hasReachedFirstLockedSum, setHasReachedFirstLockedSum] =
    useState(false)
  const [hasReachedSecondLockedSum, setHasReachedSecondLockedSum] =
    useState(false)

  useEffect(() => {
    if (questionLevel === 1) {
      setHasReachedFirstLockedSum(false)
      setHasReachedSecondLockedSum(false)
    }
    if (questionLevel === 6) {
      setHasReachedFirstLockedSum(true)
    }
    if (questionLevel === 11) {
      setHasReachedSecondLockedSum(true)
    }
  }, [questionLevel])

  return (
    <>
      <div className="flex w-full justify-center pt-3 xs-only:fixed xs-only:top-0 xs-only:z-20">
        <button
          onClick={handleEliminationClick}
          className={classNames(
            'w-[60px] sm:w-[80px] h-[40px] sm:h-[55px] mr-2 sm:mr-10 cursor-pointer',
            'transition duration-200 hover:scale-125 hover:opacity-60 outline-none',
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
            'w-[60px] sm:w-[80px] h-[40px] sm:h-[55px] mr-2 sm:mr-10 cursor-pointer',
            'transition duration-200 hover:scale-125 hover:opacity-60 outline-none',
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
            'w-[60px] sm:w-[80px] h-[40px] sm:h-[55px] cursor-pointer',
            'transition duration-200 hover:scale-125 hover:opacity-60 outline-none',
            {
              'opacity-60 pointer-events-none scale-75': isAudienceUsed
            }
          )}
        >
          <img src={audience.src} alt="" />
        </button>
      </div>
      <div className="w-[160px] sm:w-[240px] relative xs-only:pt-[64px] sm:mt-5 ml-auto md:mr-10 text-center border-b border-black overflow-hidden">
        {NUMBERS.map((el, index) => {
          const isLockedSumBackground =
            (index === 10 && hasReachedFirstLockedSum) ||
            (index === 5 && hasReachedSecondLockedSum)
          return (
            <div
              className={classNames(
                'text-sm sm:text-xl h-[17px] sm:h-[25px] border-t border-x border-black relative flex items-center',
                {
                  'bg-blue-200': isLockedSumBackground,
                  'bg-blue-100': !isLockedSumBackground
                }
              )}
              key={index}
            >
              <span
                className={classNames('z-10 w-full', {
                  'text-white': 15 - index === questionLevel,
                  'transition duration-1000': questionLevel !== 1
                })}
              >
                {(index === 5 || index === 10) && (
                  <span className={classNames('absolute left-2 top-0 h-full')}>
                    *
                  </span>
                )}
                {el.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}лв
              </span>
            </div>
          )
        })}
        <div
          style={{
            transform: `translateY(-${
              questionLevel * (screenWidth <= 767 ? 17 : 25)
            }px)`
          }}
          className={classNames(
            'absolute left-0 h-[17px] sm:h-[25px] w-[160px] sm:w-[240px] bg-blue-900',
            {
              'transition duration-1000': questionLevel !== 1 || isGameOver
            }
          )}
        />
      </div>
    </>
  )
}
