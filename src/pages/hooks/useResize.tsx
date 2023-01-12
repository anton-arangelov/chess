import { useEffect, useState } from 'react'
import { isOverflown, resizeText } from '../../config/helpers'

export const useResize = ({
  parentRef,
  childRef,
  trigger,
  isQuestion
}: {
  parentRef: HTMLDivElement | null
  childRef: HTMLParagraphElement | HTMLSpanElement | null
  trigger: string
  isQuestion?: boolean
}) => {
  const [isNewQuestionFullyLoaded, setIsNewQuestionFullyLoaded] =
    useState(false)
  const [isTextResized, setIsTextResized] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsNewQuestionFullyLoaded(false)
      setIsTextResized(false)
      setTimeout(() => {
        setIsNewQuestionFullyLoaded(true)
      }, 50)
    }
  }, [trigger])

  useEffect(() => {
    if (isNewQuestionFullyLoaded) {
      if (parentRef && isOverflown(parentRef) && childRef) {
        resizeText({
          element: childRef,
          parent: parentRef
        })
      } else {
        if (childRef && parentRef && isQuestion) {
          childRef.style.lineHeight = '28px'
          childRef.style.fontSize = '20px'
          if (isOverflown(parentRef)) {
            childRef.style.lineHeight = '24px'
            childRef.style.fontSize = '16px'
          }
        }
      }

      setIsTextResized(true)
    }
  }, [isNewQuestionFullyLoaded, childRef, parentRef, isQuestion])
  return { isNewQuestionFullyLoaded, isTextResized }
}
