import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { initialBoard } from '../pages/index'

type BoardProps = {
  board: typeof initialBoard
  clickedFigure:
    | {
        figure: string
        positionX: number
        positionY: number
        role: string
      }
    | undefined
  movedPosition?: number
  shouldAnimate?: boolean
  handleMoveFigure: (index: number) => void
}

export const Board = ({
  board,
  clickedFigure,
  movedPosition,
  shouldAnimate,
  handleMoveFigure
}: BoardProps) => {
  return (
    <>
      {Object.values(board).map(({ isReachable }, index: number) => {
        const row = Math.floor(index / 8) + 1
        return (
          <div
            key={index}
            onClickCapture={() => handleMoveFigure(index + 1)}
            className={classNames('bg-white relative', {
              'bg-yellow-600':
                (index % 2 === 0 && row % 2 === 0) ||
                (index % 2 === 1 && row % 2 === 1),
              'cursor-pointer': clickedFigure && isReachable,
              'pointer-events-none': !isReachable,
              'animate-bounce-in-out':
                index + 1 === movedPosition && shouldAnimate
            })}
          >
            {index + 1}
            {clickedFigure && isReachable && (
              <div className="h-[10px] w-[10px] z-30 rounded-full bg-teal-400 m-auto absolute top-[25px] md:top-[30.5px] left-[14px] sm:left-[25px] md:left-[31.5px]" />
            )}
          </div>
        )
      })}
    </>
  )
}
