import classNames from 'classnames'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { getAnswerLetter } from '../config/helpers'
import { isOverflown, resizeText } from '../config/helpers'

type AnswerButtonsProps = {
  answer: string
  index: number
  shouldDisplayText: boolean
  isTextResized: boolean
  setIsTextResized: Dispatch<SetStateAction<boolean>>
  clickedButton: number | undefined
  isCorrectAnswer: boolean
  isAudienceGraphAnimating: boolean
  shouldAnimateCorrectAnswer: boolean
  handleAnswerClick: (index: number, isCorrectAnswer: boolean) => void
}

export const AnswerButton = ({
  answer,
  index,
  shouldDisplayText,
  isTextResized,
  setIsTextResized,
  clickedButton,
  isCorrectAnswer,
  isAudienceGraphAnimating,
  shouldAnimateCorrectAnswer,
  handleAnswerClick
}: AnswerButtonsProps) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (answer) {
      if (
        parentRef.current &&
        isOverflown(parentRef.current) &&
        childRef.current
      ) {
        resizeText({
          element: childRef.current,
          parent: parentRef.current
        })
      }
      setIsTextResized(true)
    }
  }, [answer, setIsTextResized])

  return (
    <button
      onClick={() => handleAnswerClick(index, isCorrectAnswer)}
      className={classNames(
        'relative before:bg-blue-900 before:w-[41px] before:h-[41px] before:origin-top-right',
        'before:top-[27px] before:absolute before:border-b-[3px] before:border-l-[3px] before:border-yellow-600',
        'before:rotate-45 before:-left-[12px] sm:before:-left-[13px] before:hover:bg-yellow-700',
        'bg-blue-900 h-[60px] mx-auto w-[calc(100%_-_58px)] border-b-[3px] border-t-[3px] border-yellow-600',
        'text-white font-extrabold text-start hover:bg-yellow-700 pl-2 outline-none',
        'after:bg-blue-900 after:h-[41px] after:w-[41px] after:origin-top-left',
        'after:-top-[2px] after:absolute after:border-t-[3px] after:border-r-[3px] after:border-yellow-600',
        'after:rotate-45 after:-right-[41px] sm:after:-right-[42px] after:hover:bg-yellow-700',
        {
          'before:pointer-events-none pointer-events-none after:pointer-events-none':
            typeof clickedButton === 'number' ||
            !answer ||
            isAudienceGraphAnimating,
          'before:animate-blink-success animate-blink-success after:animate-blink-success':
            (clickedButton === index || shouldAnimateCorrectAnswer) &&
            isCorrectAnswer,
          'before:animate-blink-failure animate-blink-failure after:animate-blink-failure':
            clickedButton === index && !isCorrectAnswer
        }
      )}
    >
      <div
        ref={parentRef}
        className="flex items-center h-[40px] sm:h-[54px] overflow-hidden relative z-10"
      >
        <span className="mr-1 sm:mr-2 my-auto sm:text-base md:text-xl text-yellow-600">
          {getAnswerLetter(index + 1)}:
        </span>
        {shouldDisplayText && (
          <span
            ref={childRef}
            className={classNames({
              'opacity-0': !isTextResized
            })}
          >
            {answer}
          </span>
        )}
      </div>
    </button>
  )
}
