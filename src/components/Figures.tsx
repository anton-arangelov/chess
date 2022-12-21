import { initialWhiteFigures, initialBlackFigures } from '../pages/index'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

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
  const [width, setWidth] = useState<number>()
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

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
                  top:
                    width && width > 639
                      ? positionY * 60 - 57
                      : positionY * 60 - 50,
                  left:
                    width && width > 639
                      ? positionX * 60 - 57
                      : positionX * 37.5 - 37.5
                }}
                className={classNames(
                  'border border-transparent border-[4px] rounded absolute max-w-[37.5px] sm:max-w-none',
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
