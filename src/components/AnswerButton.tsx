import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { getAnswerLetter } from '../config/helpers'
import { useResize } from '../pages/hooks/useResize'

type AnswerButtonsProps = {
  answer: string
  index: number
  clickedButton: number | undefined
  isCorrectAnswer: boolean
  isAudienceGraphAnimating: boolean
  shouldAnimateCorrectAnswer: boolean
  handleAnswerClick: (index: number, isCorrectAnswer: boolean) => void
}

export const AnswerButton = ({
  answer,
  index,
  clickedButton,
  isCorrectAnswer,
  isAudienceGraphAnimating,
  shouldAnimateCorrectAnswer,
  handleAnswerClick
}: AnswerButtonsProps) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLSpanElement>(null)

  const { isNewQuestionFullyLoaded, isTextResized } = useResize({
    parentRef: parentRef.current,
    childRef: childRef.current,
    trigger: answer
  })

  useEffect(() => {}, [])
  return (
    <button
      onClick={() => handleAnswerClick(index, isCorrectAnswer)}
      className={classNames(
        'relative before:bg-blue-900 before:w-[41px] before:h-[41px] before:origin-top-right',
        'before:top-[27px] before:absolute before:border-b-[3px] before:border-l-[3px] before:border-yellow-600',
        'before:rotate-45 before:-left-3 before:hover:bg-yellow-700',
        'bg-blue-900 h-[60px] mx-auto w-[calc(100%_-_58px)] border-b-[3px] border-t-[3px] border-yellow-600',
        'text-white font-extrabold text-start hover:bg-yellow-700 pl-2',
        'after:bg-blue-900 after:h-[41px] after:w-[41px] after:origin-top-left',
        'after:-top-[2px] after:absolute after:border-t-[3px] after:border-r-[3px] after:border-yellow-600',
        'after:rotate-45 after:-right-[42px] after:hover:bg-yellow-700',
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
      {answer && isNewQuestionFullyLoaded && (
        <div
          ref={parentRef}
          className={classNames(
            'flex items-center h-[40px] sm:h-[54px] overflow-hidden relative z-10',
            {
              'opacity-0': !isTextResized
            }
          )}
        >
          <span className="mr-1 sm:mr-2 my-auto sm:text-base md:text-xl text-yellow-600">
            {getAnswerLetter(index + 1)}:
          </span>
          <span ref={childRef}>{answer}</span>
        </div>
      )}
    </button>
  )
}
