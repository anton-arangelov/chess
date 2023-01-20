import { initialWhiteFigures, initialBlackFigures } from '../pages/index'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { calculatePositionY, calculatePositionX } from '../config/helpers'
import { useScreenWidth } from '../hooks/useScreenWidth'

type FiguresProps = {
  areWhiteFigures?: boolean
  figures: typeof initialWhiteFigures | typeof initialBlackFigures
  isWhiteTurn: boolean
  handleFigureClicked: (
    figure: string,
    positionX: number,
    positionY: number,
    role: string
  ) => void
}

export const Figures = ({
  areWhiteFigures = false,
  figures,
  isWhiteTurn,
  handleFigureClicked
}: FiguresProps) => {
  const { screenWidth } = useScreenWidth()

  return (
    <>
      {Object.values(figures).map(
        ({ isAlive, figure, positionX, positionY, role, image }, index) => {
          if (isAlive) {
            return (
              <button
                key={index}
                onClick={() =>
                  handleFigureClicked(figure, positionX, positionY, role)
                }
                style={{
                  top: calculatePositionY(positionY, screenWidth),
                  left: calculatePositionX(positionX, screenWidth)
                }}
                className={classNames(
                  'border border-transparent border-[4px] rounded absolute max-w-[37.5px] sm:max-w-none',
                  'sm:min-w-[60px] min-h-[60px] md:min-h-[72.5px] md:min-w-[72.5px]',
                  'flex items-center justify-center focus:border focus:border-[#14b8a6] focus:border-[4px] z-20',
                  {
                    'pointer-events-none':
                      (isWhiteTurn && !areWhiteFigures) ||
                      (!isWhiteTurn && areWhiteFigures)
                  }
                )}
              >
                {image}
              </button>
            )
          }
        }
      )}
    </>
  )
}
