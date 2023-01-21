import classNames from 'classnames'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import { useScreenWidth } from '../hooks/useScreenWidth'
import { Spinner } from '../components/Spinner'
import Image from 'next/image'

const INITIAL_IMAGE =
  'https://p4.wallpaperbetter.com/wallpaper/582/909/234/best-desktop-hd-nature-pic-1920x1080-wallpaper-preview.jpg'

type CustomEvent = BaseSyntheticEvent & { pageY: number; clientX: number }

const ImageZoom = () => {
  const [draggableBoxX, setDraggableBoxX] = useState(0)
  const [draggableBoxY, setDraggableBoxY] = useState(0)
  const [mouseInsideBoxX, setMouseInsideBoxX] = useState(0)
  const [mouseInsideBoxY, setMouseInsideBoxY] = useState(0)
  const [isDraggableBoxClicked, setIsDraggableBoxClicked] = useState(false)
  const [img, setImg] = useState(INITIAL_IMAGE)
  const [isLoading, setIsLoading] = useState({
    imageOneIsLoading: false,
    imageTwoIsLoading: false
  })

  const heightRef = useRef(0)
  const widthRef = useRef(0)
  const offsetLeftRef = useRef(0)

  const { screenWidth } = useScreenWidth()

  const handleDrag = (e: CustomEvent) => {
    if (!isDraggableBoxClicked) {
      return
    }

    if (e.pageY - mouseInsideBoxY < 0) {
      setDraggableBoxY(0)
    }
    if (e.pageY - mouseInsideBoxY > heightRef.current - 50) {
      setDraggableBoxY(heightRef.current - 50)
    }
    if (
      e.pageY - mouseInsideBoxY >= 0 &&
      e.pageY - mouseInsideBoxY <= heightRef.current - 50
    ) {
      setDraggableBoxY(e.pageY - mouseInsideBoxY)
    }

    if (e.clientX - mouseInsideBoxX < offsetLeftRef.current) {
      setDraggableBoxX(offsetLeftRef.current)
    }
    if (
      e.clientX - mouseInsideBoxX >
      offsetLeftRef.current + widthRef.current - 100
    ) {
      setDraggableBoxX(offsetLeftRef.current + widthRef.current - 100)
    }
    if (
      e.clientX - mouseInsideBoxX >= offsetLeftRef.current &&
      e.clientX - mouseInsideBoxX <=
        offsetLeftRef.current + widthRef.current - 100
    ) {
      setDraggableBoxX(e.clientX - mouseInsideBoxX)
    }
  }

  const handleContainerPointerDown = (e: CustomEvent) => {
    if (e.target.id === 'draggable-box') {
      return
    }

    setIsDraggableBoxClicked(true)

    if (e.pageY >= 25 && e.pageY <= heightRef.current - 25) {
      setDraggableBoxY(e.pageY - 25)
      setMouseInsideBoxY(25)
    }
    if (e.pageY < 25) {
      setDraggableBoxY(0)
      setMouseInsideBoxY(e.pageY)
    }
    if (e.pageY > heightRef.current - 25) {
      setDraggableBoxY(heightRef.current - 50)
      setMouseInsideBoxY(e.pageY - heightRef.current + 50)
    }

    if (
      e.clientX >= offsetLeftRef.current + 50 &&
      e.clientX <= offsetLeftRef.current + widthRef.current - 50
    ) {
      setDraggableBoxX(e.clientX - 50)
      setMouseInsideBoxX(50)
    }
    if (e.clientX < offsetLeftRef.current + 50) {
      setDraggableBoxX(offsetLeftRef.current)
      setMouseInsideBoxX(e.clientX - offsetLeftRef.current)
    }
    if (e.clientX > offsetLeftRef.current + widthRef.current - 50) {
      setDraggableBoxX(offsetLeftRef.current + widthRef.current - 100)
      setMouseInsideBoxX(
        e.clientX - offsetLeftRef.current - widthRef.current + 100
      )
    }
  }

  const handleDraggableBoxPointerDown = (e: CustomEvent) => {
    setIsDraggableBoxClicked(true)
    setMouseInsideBoxY(e.pageY - draggableBoxY)
    setMouseInsideBoxX(e.clientX - draggableBoxX)
  }

  const handleImageUpload = (e: BaseSyntheticEvent) => {
    const file = e?.target?.files?.[0]?.name ?? ''
    if (!file.match(/\.(jpeg|jpg|gif|png)$/)) {
      return
    }
    const url = URL.createObjectURL(e.target.files?.[0])
    setIsLoading({ imageOneIsLoading: true, imageTwoIsLoading: true })
    setImg('')
    setImg(URL.createObjectURL(e.target.files?.[0]))
  }

  useEffect(() => {
    const element = document.getElementById('game-map')
    heightRef.current = element?.clientHeight ?? 0
    widthRef.current = element?.clientWidth ?? 0
    offsetLeftRef.current = element?.offsetLeft ?? 0
    setDraggableBoxX(offsetLeftRef.current)
    setDraggableBoxY(0)
  }, [screenWidth])

  return (
    <div
      onPointerUp={() => setIsDraggableBoxClicked(false)}
      className="h-screen"
      onPointerMove={handleDrag}
    >
      {/* {(isLoading.imageOneIsLoading || isLoading.imageTwoIsLoading) && ( */}
      <Spinner />
      {/* )} */}
      <div
        className={classNames(
          'flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-6 items-center'
        )}
      >
        <div
          className="h-[300px] md:h-[500px] w-[300px] md:w-[500px] touch-none"
          id="game-map"
          onPointerDown={handleContainerPointerDown}
        >
          <img
            src={img}
            alt=""
            className={classNames(
              'w-full h-full select-none pointer-events-none',
              {
                hidden:
                  isLoading.imageOneIsLoading || isLoading.imageTwoIsLoading
              }
            )}
            onLoad={() => {
              setIsLoading(prev => {
                return { ...prev, imageOneIsLoading: false }
              })
            }}
          />
          <div
            id="draggable-box"
            style={{ top: draggableBoxY, left: draggableBoxX }}
            className="w-[100px] h-[50px] border absolute bg-white opacity-50"
            onPointerDown={handleDraggableBoxPointerDown}
          ></div>
        </div>
        <div className="h-[300px] md:h-[500px] w-[300px] md:w-[500px] overflow-hidden relative">
          <img
            style={{
              top: -(draggableBoxY * (screenWidth >= 1024 ? 10 : 6)),
              left: -(
                (draggableBoxX - offsetLeftRef.current) *
                (screenWidth >= 1024 ? 5 : 3)
              )
            }}
            src={img}
            alt=""
            className={classNames(
              'absolute select-none h-[1800px] md:h-[5000px] max-w-[900px] md:max-w-[2500px] w-[900px] md:w-[2500px] pointer-events-none',
              {
                hidden:
                  isLoading.imageOneIsLoading || isLoading.imageTwoIsLoading
              }
            )}
            onLoad={() => {
              setIsLoading(prev => {
                return { ...prev, imageTwoIsLoading: false }
              })
            }}
          />
        </div>
      </div>
      <button
        onClick={() => document.getElementById('file-input')?.click()}
        className={classNames(
          'flex mx-auto mt-4 rounded-full bg-green-300 text-xl py-3',
          'px-10 select-none outline-none duration-200 active:bg-green-400 active:scale-90'
        )}
      >
        Select an image
      </button>
      <input
        id="file-input"
        className="hidden"
        onChange={handleImageUpload}
        type="file"
      />
    </div>
  )
}

export default ImageZoom
