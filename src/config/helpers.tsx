import { OCCUPIED_BY } from './constants'
import { OfficerPossibleMovements, HorsePossibleMovements } from './types'

export const handleOfficerPossibleMovements = ({
  newBoard,
  position,
  positionX,
  isWhiteTurn
}: OfficerPossibleMovements) => {
  for (let i = 7; i <= 49; i = i + 7) {
    if (position + i <= 64 && i <= (positionX - 1) * 7) {
      const isOccupiedBy = newBoard[position + i].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[position + i].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
  for (let i = 7; i <= 49; i = i + 7) {
    if (position - i >= 1 && i <= (8 - positionX) * 7) {
      const isOccupiedBy = newBoard[position - i].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[position - i].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
  for (let i = 9; i <= 63; i = i + 9) {
    if (position + i <= 64 && i <= (8 - positionX) * 9) {
      const isOccupiedBy = newBoard[position + i].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[position + i].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
  for (let i = 9; i <= 63; i = i + 9) {
    if (position - i >= 1 && i <= (positionX - 1) * 9) {
      const isOccupiedBy = newBoard[position - i].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[position - i].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
}

export const handleRookPossibleMovements = ({
  newBoard,
  position,
  isWhiteTurn
}: HorsePossibleMovements) => {
  for (let i = 8; i <= 56; i = i + 8) {
    if (position + i <= 64) {
      const isOccupiedBy =
        newBoard[(position + i) as keyof typeof newBoard].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[(position + i) as keyof typeof newBoard].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
  for (let i = 8; i <= 56; i = i + 8) {
    if (position - i >= 1) {
      const isOccupiedBy =
        newBoard[(position - i) as keyof typeof newBoard].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[(position - i) as keyof typeof newBoard].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (position % 8 !== 0 && (position % 8) + i <= 8 && position + i <= 64) {
      const isOccupiedBy =
        newBoard[(position + i) as keyof typeof newBoard].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[(position + i) as keyof typeof newBoard].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (position % 8 === 0 || (position % 8) - i >= 1) {
      const isOccupiedBy =
        newBoard[(position - i) as keyof typeof newBoard].isOccupiedBy
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break
      }
      newBoard[(position - i) as keyof typeof newBoard].isReachable = true
      if (isOccupiedBy) {
        break
      }
    }
  }
}

export const calculatePositionY = (
  positionY: number,
  calculatedWidth: number
) => {
  if (calculatedWidth > 1023) {
    return positionY * 72.5 - 72.5
  }
  return positionY * 60 - 60
}

export const calculatePositionX = (
  positionX: number,
  calculatedWidth: number
) => {
  if (calculatedWidth > 1023) {
    return positionX * 72.5 - 72.5
  }
  if (calculatedWidth > 767) {
    return positionX * 60 - 60
  }
  return positionX * 37.5 - 37.5
}

export const getAnswerLetter = (number: number) => {
  if (number === 1) {
    return 'A'
  }
  if (number === 2) {
    return 'B'
  }
  if (number === 3) {
    return 'C'
  }
  if (number === 4) {
    return 'D'
  }
  return ''
}

export const generateRandomWrongAnswerNumber = (
  correctAnswerNumber: number
): number => {
  const number = Math.floor(Math.random() * 4)
  if (number + 1 === correctAnswerNumber) {
    return generateRandomWrongAnswerNumber(correctAnswerNumber)
  }
  return number
}

export const getProbabilityFriendAnswer = ({
  questionLevel,
  question,
  isEliminationUsed
}: {
  questionLevel: number
  question: { question: string; answers: string[]; correct: number }
  isEliminationUsed: boolean
}): string => {
  const correctAnswer = getAnswerLetter(question.correct)
  let randomNumber = Math.ceil(Math.random() * 10)
  let probability = 0
  if (questionLevel > 5 && questionLevel < 8) {
    probability = 8
  }
  if (questionLevel >= 8 && questionLevel < 10) {
    probability = 7
  }
  if (questionLevel >= 10 && questionLevel < 12) {
    probability = 5
  }
  if (questionLevel >= 12 && questionLevel < 15) {
    probability = 3
  }
  if (questionLevel === 15) {
    probability = 1
  }

  if (randomNumber <= probability) {
    return `Мисля, че отговорът е ${correctAnswer}`
  }
  randomNumber = Math.ceil(Math.random() * 5)
  if (randomNumber > 2 || (randomNumber === 2 && isEliminationUsed)) {
    return 'Не знам'
  }
  const wrongAnswerNumber = generateRandomWrongAnswerNumber(question.correct)
  const wrongAnswerLetter = getAnswerLetter(wrongAnswerNumber)
  if (randomNumber === 1) {
    return `Мисля, че отговорът е ${wrongAnswerLetter}`
  }
  if (correctAnswer > wrongAnswerLetter) {
    return `Колебая се между ${wrongAnswerLetter} и ${correctAnswer}`
  }
  return `Колебая се между ${correctAnswer} и ${wrongAnswerLetter}`
}

export const getAudienceAnswer = ({
  questionLevel,
  question,
  isEliminationUsed
}: {
  questionLevel: number
  question: { question: string; answers: string[]; correct: number }
  isEliminationUsed: boolean
}) => {
  const numberToCheck = Math.floor(Math.random() * 100)
  let helperObject: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0 }
  let number = Math.floor(Math.random() * 20),
    remainingSum = 100
  if (questionLevel <= 5 && numberToCheck >= 90) {
    number += isEliminationUsed ? 50 : 10
  }
  if (questionLevel > 5 && questionLevel < 8 && numberToCheck >= 70) {
    number += isEliminationUsed ? 15 : 30
  }
  if (questionLevel >= 8 && questionLevel < 10 && numberToCheck >= 50) {
    number += isEliminationUsed ? 25 : 40
  }
  if (questionLevel >= 10 && questionLevel < 12 && numberToCheck >= 30) {
    number += isEliminationUsed ? 30 : 50
  }
  if (questionLevel >= 12 && questionLevel < 15 && numberToCheck >= 20) {
    number += isEliminationUsed ? 35 : 60
  }
  if (questionLevel === 15 && numberToCheck >= 10) {
    number += isEliminationUsed ? 45 : 75
  }

  helperObject[question.correct as keyof typeof helperObject] = 100 - number
  remainingSum = number
  Object.keys(helperObject)
    .filter(el => +el !== question.correct)
    .forEach((key, index) => {
      if (question.answers[+key - 1] === '') {
        return
      }
      if (index === 2 || isEliminationUsed) {
        helperObject[+key] = remainingSum
        return
      }
      if (+key !== question.correct) {
        number = Math.floor(Math.random() * remainingSum)
        helperObject[+key] = number
        remainingSum -= number
      }
    })
  return helperObject
}

export const getNotificationText = ({
  gameOver,
  questionLevel
}: {
  gameOver: { hasWon: boolean } | undefined
  questionLevel: number
}) => {
  if (gameOver?.hasWon) {
    return 'Печелиш 100 000лв'
  }
  let sum = '0'
  if (questionLevel === 5) {
    sum = '500'
  }
  if (questionLevel === 10) {
    sum = '5 000'
  }
  return `Грешен отговор. Спечелената сума е ${sum}лв`
}

export const isOverflown = ({
  clientHeight,
  scrollHeight,
  clientWidth,
  scrollWidth
}: {
  clientHeight: number
  scrollHeight: number
  clientWidth: number
  scrollWidth: number
}) => scrollHeight > clientHeight || scrollWidth > clientWidth

export const resizeText = ({
  element,
  parent
}: {
  element: HTMLParagraphElement | HTMLSpanElement
  parent: HTMLDivElement
  shouldCheckWidth?: boolean
}) => {
  let i = 2 // let's start with 12px
  let overflow = false
  const maxSize = 128 // very huge text size
  while (!overflow && i < maxSize) {
    element.style.fontSize = `${i}px`
    overflow = isOverflown(parent)
    if (!overflow) i++

    // revert to last state where no overflow happened:
    element.style.fontSize = `${i - 1}px`
  }
}
