import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import { Notification } from '../components/Notification'

const buttons = [
  { description: 'Add a pizza', name: 'Pizza' },
  { description: 'Add a cola', name: 'Cola' }
]

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
    let interval: any
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

  const handleDuckClicked = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    timer.stop()
    setScore(prev => prev + 1)
    setIsDuckAlive(false)
  }

  const resetGame = useCallback(() => {
    setIsDuckAlive(false)
    setMissedDucksCount(0)
    setScore(0)
    timer.stop()
    if (!isNotificationVisible) {
      setIsGameStarted(false)
    }
    if (isNotificationVisible) {
      setIsNotificationVisible(false)
    }
  }, [timer, isNotificationVisible])

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
      setAnimationNumber(Math.floor(Math.random() * 4) + 1)
      setIsDuckAlive(true)
      timer.start()
    }
  }, [isDuckAlive, timer, isGameStarted])

  useEffect(() => {
    if (missedDucksCount === 20) {
      setIsNotificationVisible(true)
    }
  }, [missedDucksCount, timer, resetGame])

  return (
    <div className="flex flex-col justify-center items-center">
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
      {isNotificationVisible && (
        <Notification
          notificationText="Game is over"
          isDuckNotification
          handleNotificationClick={resetGame}
        />
      )}
      <div className="h-[400px] w-[360px] sm:w-[400px] border-[1px] border-black mt-[50px] cursor-crosshair relative overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ilm0LNsgmhEB-aDJQw9Ak0pQqAGYElnd4A&usqp=CAU"
          alt=""
          className="w-full h-full pointer-events-none -z-10"
        />
        <span className="absolute w-full h-full top-0"></span>
        {isGameStarted && isDuckAlive && (
          <button
            className={classNames(
              'absolute justify-center -left-10 top-10 transition duration-300 cursor-crosshair flex',
              {
                'animate-slide-one': animationNumber === 1,
                'animate-slide-two': animationNumber === 2,
                'animate-slide-three': animationNumber === 3,
                'animate-slide-four': animationNumber === 4
              }
            )}
            onMouseDown={handleDuckClicked}
          >
            <span className="m-auto w-1 h-6" />
            <img
              className="m-auto transform -translate-x-2 h-12 w-12 pointer-events-none"
              alt=""
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d0bea147-2598-474c-8176-651a8c00b41b/df87clj-674162df-9af1-48fe-a8b1-58383ea45e57.png/v1/fill/w_1280,h_1280,strp/kawaii_duck_png_by_milosii_df87clj-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2QwYmVhMTQ3LTI1OTgtNDc0Yy04MTc2LTY1MWE4YzAwYjQxYlwvZGY4N2Nsai02NzQxNjJkZi05YWYxLTQ4ZmUtYThiMS01ODM4M2VhNDVlNTcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.whRL47laJU_MFPCt52Q5rrhaMOJfTGYXMkdDK1VS_8s"
            />
          </button>
        )}
      </div>
      <span> Score is {score}</span>
      <button
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
      <span> Missed ducks are {missedDucksCount}</span>
    </div>
  )
}

export default ShootTheDuck
