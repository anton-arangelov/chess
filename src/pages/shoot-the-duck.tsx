import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Notification } from '../components/Notification'
import { Duck } from '../components/Duck'
import { CustomBaseSyntheticEvent, ScoreData } from '../config/types'
import axios from 'axios'

const buttons = [
  { description: 'Add a pizza', name: 'Pizza' },
  { description: 'Add a cola', name: 'Cola' }
]

let timeout: ReturnType<typeof setTimeout> | null
let scoreData: ScoreData = []
let currentRank: number | undefined

const ShootTheDuck = () => {
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([])
  const [isGiftAvailable, setIsGiftAvailable] = useState(false)
  const shouldAddGiftRef = useRef(false)

  const [score, setScore] = useState(0)
  const [isDuckAlive, setIsDuckAlive] = useState(false)
  const [animationNumber, setAnimationNumber] = useState(1)
  const [missedDucksCount, setMissedDucksCount] = useState(0)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [clickCoordinates, setClickCoordinates] =
    useState<{ x: number; y: number }>()
  const [isClicked, setIsClicked] = useState(false)
  const [rank, setRank] = useState<number | undefined>()
  const [name, setName] = useState('')
  const [isResultSubmitted, setIsResultSubmitted] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const numberOfItems = useMemo(
    () =>
      items.reduce((acc, { name, quantity }) => {
        if (name !== 'Sprite') {
          return acc + quantity
        }
        return acc
      }, 0),
    [items]
  )

  const timer = useMemo(() => {
    let interval: ReturnType<typeof setInterval>
    return {
      start: () => {
        interval = setInterval(() => {
          setMissedDucksCount(prev => prev + 1)
        }, 2000)
      },
      stop: () => {
        clearInterval(interval)
      }
    }
  }, [])

  const handleAddProduct = useCallback(
    (itemName: string) => {
      const existingItemIndex = items.findIndex(({ name }) => name === itemName)
      if (existingItemIndex > -1) {
        const helperArray = JSON.parse(JSON.stringify(items))
        helperArray[existingItemIndex].quantity++
        setItems(helperArray)
        return
      }
      setItems(prev => [...prev, { name: itemName, quantity: 1 }])
    },
    [items]
  )

  const handlePointerDown = useCallback(
    (e: CustomBaseSyntheticEvent) => {
      if (!isGameStarted) {
        return
      }
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      setIsClicked(true)
      setClickCoordinates({
        x: Math.floor(e.clientX) - 1,
        y: Math.floor(e.clientY) - 1
      })
      timeout = setTimeout(() => {
        setIsClicked(false)
      }, 300)
    },
    [isGameStarted]
  )

  const handleDuckClicked = (e: CustomBaseSyntheticEvent) => {
    e.stopPropagation()
    timer.stop()
    setScore(prev => prev + 1)
    setIsDuckAlive(false)
  }

  const resetGame = () => {
    setIsDuckAlive(false)
    setMissedDucksCount(0)
    setScore(0)
    setRank(undefined)
    setName('')
    setIsResultSubmitted(false)
    scoreData = []
    currentRank = undefined
    timer.stop()
    if (!isNotificationVisible) {
      setIsGameStarted(false)
    }
    if (isNotificationVisible) {
      setIsNotificationVisible(false)
    }
  }

  const handleFormSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setName(inputRef.current?.value ?? '')
  }

  useEffect(() => {
    if (numberOfItems && numberOfItems % 10 === 0) {
      if (!isGiftAvailable) {
        setIsGiftAvailable(true)
      }
      if (shouldAddGiftRef.current) {
        handleAddProduct('Sprite')
        shouldAddGiftRef.current = false
      }
    }
    if (numberOfItems % 10 === 1) {
      shouldAddGiftRef.current = true
    }
  }, [numberOfItems, isGiftAvailable, handleAddProduct])

  useEffect(() => {
    if (!isDuckAlive && isGameStarted) {
      let multiplier = 4
      if (score > 5) {
        multiplier = 8
      }
      if (score > 10) {
        multiplier = 10
      }
      setAnimationNumber(Math.ceil(Math.random() * multiplier))
      setIsDuckAlive(true)
      timer.start()
    }
  }, [isDuckAlive, timer, isGameStarted, score])

  useEffect(() => {
    if (missedDucksCount === 20) {
      if (score !== 0) {
        const getScores = async () => {
          const result = await axios.post('api/scores', {
            method: 'get'
          })
          scoreData = result.data

          const firstScore = result.data?.[0]?.score
          const secondScore = result.data?.[1]?.score
          const thirdScore = result.data?.[2]?.score
          if (typeof thirdScore === 'number' && score > thirdScore) {
            currentRank = 3
          }
          if (typeof secondScore === 'number' && score > secondScore) {
            currentRank = 2
          }
          if (typeof firstScore === 'number' && score > firstScore) {
            currentRank = 1
          }
          if (currentRank) {
            setRank(currentRank)
          }
        }
        getScores()
      }
      setIsNotificationVisible(true)
    }
  }, [missedDucksCount, score])

  useEffect(() => {
    if (name && scoreData.length) {
      const updateScore = async () => {
        if (currentRank) {
          scoreData?.splice(currentRank - 1, 0, { name, score })
          scoreData?.pop()
        }
        await axios.post('api/scores', { method: 'put', data: scoreData })
        setIsResultSubmitted(true)
      }
      updateScore()
    }
  }, [name, score])

  return (
    <div className="flex relative flex-col justify-center items-center">
      {/* {buttons.map(({ description, name }, index) => (
        <button
          key={index}
          className="block"
          onClick={() => handleAddProduct(name)}
        >
          {description}
        </button>
      ))}
      {items.map((el, index) => {
        return (
          <div key={index}>
            {el.name} is {el.quantity}
          </div>
        )
      })}
      {!!items.length && (
        <button
          className="block"
          onClick={() => {
            setItems([])
            setIsGiftAvailable(false)
          }}
        >
          Restore
        </button>
      )}
      <div>
        Total items are {items.reduce((acc, { quantity }) => acc + quantity, 0)}
      </div> */}
      {isClicked && !isNotificationVisible && isGameStarted && (
        <span
          className="h-1 w-1 bg-teal-700 fixed rounded z-10 cursor-crosshair"
          style={{
            top: clickCoordinates?.y,
            left: clickCoordinates?.x
          }}
        ></span>
      )}
      {isNotificationVisible && (
        <Notification
          notificationText="Game is over"
          isDuckNotification
          name={name}
          rank={rank}
          isResultSubmitted={isResultSubmitted}
          inputRef={inputRef}
          scoreData={scoreData}
          handleNotificationClick={resetGame}
          handleFormSubmit={handleFormSubmit}
        />
      )}
      <div
        onPointerDown={handlePointerDown}
        id="gameBoard"
        className="h-[400px] w-[360px] sm:w-[400px] border-[1px] border-black mt-[50px] cursor-crosshair relative overflow-hidden"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ilm0LNsgmhEB-aDJQw9Ak0pQqAGYElnd4A&usqp=CAU"
          alt=""
          className="w-full h-full select-none pointer-events-none"
        />
        {isGameStarted && isDuckAlive && (
          <Duck
            animationNumber={animationNumber}
            handleDuckClicked={handleDuckClicked}
          />
        )}
      </div>
      <span> Score is {score}</span>
      <span> Missed ducks are {missedDucksCount}</span>
      <button
        className="bg-green-300 rounded-md px-10 py-1 sm:hover:bg-green-400 active:bg-green-500 sm:active:bg-green-500 mt-2"
        onClick={() => {
          if (!isGameStarted) {
            setIsGameStarted(true)
            return
          }
          resetGame()
        }}
      >
        {isGameStarted ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default ShootTheDuck
