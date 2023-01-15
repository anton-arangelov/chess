import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useResize } from '../hooks/useResize'
import { isOverflown, resizeText } from '../config/helpers'

type QuestionProps = {
  question: string
  screenWidth: number
  shouldDisplayText: boolean
  isTextResized: boolean
  setIsTextResized: any
}

export const Question = ({
  question,
  screenWidth,
  shouldDisplayText,
  isTextResized,
  setIsTextResized
}: QuestionProps) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (question) {
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
  }, [question, setIsTextResized])

  return (
    <div className="w-full flex">
      {screenWidth > 767 && (
        <span className="w-[10%] h-[3px] bg-yellow-600 my-auto"></span>
      )}
      <div className="w-full sm:w-[80%] h-[60px] flex justify-between overflow-hidden">
        <div className="w-11 -ml-[14px] -mt-[1px] overflow-hidden">
          <div className="bg-blue-900 h-11 w-11 border border-[3px] border-yellow-600 -rotate-45 transform origin-top-right"></div>
        </div>
        <div
          ref={parentRef}
          className="bg-blue-900 text-white w-[calc(100%_-_60px)] border-t-[3px] border-b-[3px] border-yellow-600 text-center"
        >
          {shouldDisplayText && (
            <p
              ref={childRef}
              className={classNames('font-extrabold py-[2px]', {
                'opacity-0': !isTextResized
              })}
            >
              {question}
            </p>
          )}
        </div>
        <div className="w-11 -mt-[1px] -mr-[14px] overflow-hidden">
          <div className="bg-blue-900 h-11 w-11 border border-[3px] border-yellow-600 rotate-45 transform origin-top-left"></div>
        </div>
      </div>
      {screenWidth > 767 && (
        <span className="w-[10%] h-[3px] bg-yellow-600 my-auto"></span>
      )}
    </div>
  )
}
