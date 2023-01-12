import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { CustomBaseSyntheticEvent } from '../config/types'

// This helper is declared here because of tailwind specifications and if it is in the helpers file, it is not working every time
const getDuckAnimation = (animationNumber: number) => {
  if (animationNumber === 1) {
    return '-left-10 animate-slide-xs-one sm:animate-slide-one'
  }
  if (animationNumber === 2) {
    return '-left-10 animate-slide-xs-two sm:animate-slide-two'
  }
  if (animationNumber === 3) {
    return '-left-10 animate-slide-xs-three sm:animate-slide-three'
  }
  if (animationNumber === 4) {
    return '-left-10 animate-slide-xs-four sm:animate-slide-four'
  }
  if (animationNumber === 5) {
    return '-left-10 animate-slide-xs-five sm:animate-slide-five'
  }
  if (animationNumber === 6) {
    return '-left-10 animate-slide-xs-six sm:animate-slide-six'
  }
  if (animationNumber === 7) {
    return '-left-10 animate-slide-xs-seven sm:animate-slide-seven'
  }
  if (animationNumber === 8) {
    return '-left-10 animate-slide-xs-eight sm:animate-slide-eight'
  }
  if (animationNumber === 9) {
    return '-right-10 animate-slide-xs-nine sm:animate-slide-nine'
  }
  if (animationNumber === 10) {
    return '-right-10 animate-slide-xs-ten sm:animate-slide-ten'
  }
}

type DuckProps = {
  animationNumber: number
  handleDuckClicked: (e: CustomBaseSyntheticEvent) => void
}

export const Duck = ({ animationNumber, handleDuckClicked }: DuckProps) => {
  const [width, setWidth] = useState<number>()

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return (
    <button
      className={classNames(
        'absolute justify-center top-10 transition',
        'duration-300 cursor-crosshair flex',
        getDuckAnimation(animationNumber)
      )}
      {...(width && width > 767 && { onPointerDown: handleDuckClicked })}
    >
      {width && width <= 767 && (
        <span
          id="duckSpan"
          className="w-6 h-6 absolute left-2 top-2 cursor-crosshair"
          onPointerDown={handleDuckClicked}
        />
      )}
      <img
        className="m-auto transform -translate-x-0 h-10 w-10 pointer-events-none select-none"
        alt=""
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d0bea147-2598-474c-8176-651a8c00b41b/df87clj-674162df-9af1-48fe-a8b1-58383ea45e57.png/v1/fill/w_1280,h_1280,strp/kawaii_duck_png_by_milosii_df87clj-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2QwYmVhMTQ3LTI1OTgtNDc0Yy04MTc2LTY1MWE4YzAwYjQxYlwvZGY4N2Nsai02NzQxNjJkZi05YWYxLTQ4ZmUtYThiMS01ODM4M2VhNDVlNTcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.whRL47laJU_MFPCt52Q5rrhaMOJfTGYXMkdDK1VS_8s"
      />
    </button>
  )
}
