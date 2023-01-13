import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { QUESTIONS } from '../config/constants'
import { Question } from '../components/Question'
import { AnswerButton } from '../components/AnswerButton'
import { MillionaireMenu } from '../components/MillionaireMenu'
import { Notification } from '../components/Notification'
import { AudienceGraph } from '../components/AudienceGraph'
import {
  generateRandomWrongAnswerNumber,
  getAnswerLetter,
  getAudienceAnswer,
  getNotificationText,
  getProbabilityFriendAnswer
} from '../config/helpers'
import millionaireImage from '../assets/millionaire-image.jpg'

const Millionaire = () => {
  const [questionLevel, setQuestionLevel] = useState(1)
  const [question, setQuestion] = useState({
    question: '',
    answers: ['', '', '', ''],
    correct: 0
  })
  const [clickedButton, setClickedButton] = useState<number | undefined>()
  const [isEliminationUsed, setIsEliminationUsed] = useState(false)
  const [isTelephoneUsed, setIsTelephoneUsed] = useState(false)
  const [isAudienceUsed, setIsAudienceUsed] = useState(false)
  const [isAudienceGraphAnimating, setIsAudienceGraphAnimating] =
    useState(false)
  const [shouldAnimateCorrectAnswer, setShouldAnimateCorrectAnswer] =
    useState(false)
  const [shouldAnimateLockedSum, setShouldAnimateLockedSum] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [isAudienceGraphVisible, setIsAudienceGraphVisible] = useState(false)
  const [gameOver, setGameOver] = useState<{ hasWon: boolean } | undefined>()
  const [screenWidth, setScreenWidth] = useState(0)

  const friendAnswerRef = useRef<string>('')
  const audienceAnswersRef = useRef({})

  const resetGame = () => {
    setQuestion(QUESTIONS[0][Math.floor(Math.random() * QUESTIONS[0].length)])
    setQuestionLevel(1)
    setIsEliminationUsed(false)
    setIsTelephoneUsed(false)
    setIsAudienceUsed(false)
    setShouldAnimateCorrectAnswer(false)
    setIsNotificationVisible(false)
    setGameOver(undefined)
    audienceAnswersRef.current = {}
  }

  const handleAnswerClick = (index: number, isCorrectAnswer: boolean) => {
    setClickedButton(index)
    if (isAudienceGraphVisible) {
      setIsAudienceGraphVisible(false)
    }
    setTimeout(() => {
      setClickedButton(undefined)
      if (isCorrectAnswer) {
        if (questionLevel === 15) {
          setIsNotificationVisible(true)
          setGameOver({ hasWon: true })
          return
        }
        setQuestionLevel((prev: number) => prev + 1)
        return
      }
      setIsNotificationVisible(true)
      setGameOver({ hasWon: false })
      if (questionLevel > 10) {
        setQuestionLevel(10)
        return
      }
      if (questionLevel > 5) {
        return setQuestionLevel(5)
      }
      return setQuestionLevel(0)
    }, 2000)
    if (!isCorrectAnswer) {
      setTimeout(() => {
        setShouldAnimateCorrectAnswer(true)
      }, 1000)
    }
  }

  const handleEliminationClick = () => {
    if (!question) {
      return
    }

    const randomNumber = generateRandomWrongAnswerNumber(question.correct)
    const helperAnswers = question.answers.map((answer, index) => {
      if (index !== randomNumber && index + 1 !== question.correct) {
        answer = ''
      }
      return answer
    })

    setQuestion(prev => {
      return { ...prev, answers: helperAnswers }
    })
    setIsEliminationUsed(true)
  }

  const handleTelephoneClick = () => {
    if (!question) {
      return
    }
    setIsNotificationVisible(true)
    if (questionLevel <= 5) {
      friendAnswerRef.current = `Мисля, че отговорът е ${getAnswerLetter(
        question.correct
      )}`
    } else {
      friendAnswerRef.current = getProbabilityFriendAnswer({
        questionLevel,
        question,
        isEliminationUsed
      })
    }
    setIsTelephoneUsed(true)
  }

  const handleAudienceClick = () => {
    setIsAudienceUsed(true)
    setIsAudienceGraphVisible(true)
    setIsAudienceGraphAnimating(true)
    audienceAnswersRef.current = getAudienceAnswer({
      questionLevel,
      question,
      isEliminationUsed
    })
    setTimeout(() => {
      setIsAudienceGraphAnimating(false)
    }, 2000)
  }

  const handleNotificationClick = () => {
    setIsNotificationVisible(false)
    if (gameOver) {
      resetGame()
    }
    if (friendAnswerRef.current) {
      friendAnswerRef.current = ''
    }
  }

  useEffect(() => {
    if (typeof gameOver === 'undefined') {
      setQuestion(
        QUESTIONS[questionLevel - 1][
          Math.floor(Math.random() * QUESTIONS[questionLevel - 1].length)
        ]
      )
    }
    if (questionLevel === 6 || questionLevel === 11 || gameOver?.hasWon) {
      setShouldAnimateLockedSum(true)
      setTimeout(() => {
        setShouldAnimateLockedSum(false)
      }, 2000)
    }
  }, [questionLevel, gameOver])

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  return (
    <>
      <img
        className="w-full fixed -z-10 select-none pointer-events-none h-screen"
        alt=""
        src={millionaireImage.src}
      />
      {shouldAnimateLockedSum && (
        <span className="animate-blink-screen h-screen w-full fixed z-30" />
      )}
      {isNotificationVisible && !shouldAnimateLockedSum && (
        <Notification
          notificationText={
            gameOver
              ? getNotificationText({
                  gameOver,
                  questionLevel
                })
              : friendAnswerRef.current
          }
          isMillionaireNotification
          handleNotificationClick={handleNotificationClick}
        />
      )}
      <MillionaireMenu
        isEliminationUsed={isEliminationUsed}
        isTelephoneUsed={isTelephoneUsed}
        isAudienceUsed={isAudienceUsed}
        questionLevel={questionLevel}
        screenWidth={screenWidth}
        isGameOver={typeof gameOver !== 'undefined'}
        handleEliminationClick={handleEliminationClick}
        handleTelephoneClick={handleTelephoneClick}
        handleAudienceClick={handleAudienceClick}
      />
      {isAudienceGraphVisible && (
        <AudienceGraph
          audienceAnswers={audienceAnswersRef.current}
          isAudienceGraphAnimating={isAudienceGraphAnimating}
          answers={question.answers}
        />
      )}
      <div
        className={classNames('w-full relative mt-[40px]', {
          'opacity-0': shouldAnimateLockedSum || gameOver?.hasWon
        })}
      >
        <Question
          question={question?.question ?? ''}
          screenWidth={screenWidth}
        />
        <div className="grid grid-cols-[10%_40%_40%_10%] grid-rows-2 gap-y-8 mt-10">
          {screenWidth > 767 && (
            <span className="row-start-1 h-[3px] bg-yellow-600 my-auto"></span>
          )}
          {screenWidth > 767 && (
            <span className="row-start-2 h-[3px] bg-yellow-600 my-auto"></span>
          )}
          <div className="col-start-1 sm:col-start-2 col-end-5 sm:col-end-4 row-start-1 row-end-3 grid grid-cols-2 grid-rows-2 gap-y-8 sm:gap-x-[2px]">
            {question?.answers?.map((answer, index) => {
              return (
                <AnswerButton
                  key={index}
                  index={index}
                  answer={answer}
                  clickedButton={clickedButton}
                  isCorrectAnswer={question.correct === index + 1}
                  isAudienceGraphAnimating={isAudienceGraphAnimating}
                  shouldAnimateCorrectAnswer={shouldAnimateCorrectAnswer}
                  handleAnswerClick={handleAnswerClick}
                />
              )
            })}
          </div>
          {screenWidth > 767 && (
            <span className="row-start-1 col-start-4 h-[3px] bg-yellow-600 my-auto"></span>
          )}
          {screenWidth > 767 && (
            <span className="row-start-2 col-start-4 h-[3px] bg-yellow-600 my-auto"></span>
          )}
        </div>
      </div>
    </>
  )
}

export default Millionaire
