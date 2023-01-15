import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isOverflown, resizeText } from '../config/helpers'

export const useResize = ({
  parentRef,
  childRef,
  trigger,
  setIsTextResized
}: {
  parentRef: HTMLDivElement | null
  childRef: HTMLParagraphElement | HTMLSpanElement | null
  trigger: string
  setIsTextResized: Dispatch<SetStateAction<boolean>>
}) => {
  useEffect(() => {
    if (trigger) {
      if (parentRef && isOverflown(parentRef) && childRef) {
        resizeText({
          element: childRef,
          parent: parentRef
        })
      }
      setIsTextResized(true)
    }
  }, [childRef, parentRef, setIsTextResized, trigger])
}
