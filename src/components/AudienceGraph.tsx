import classNames from 'classnames'
import { getAnswerLetter } from '../config/helpers'

const audienceAnimations = [
  'animate-audience-one',
  'animate-audience-two',
  'animate-audience-three',
  'animate-audience-four'
].sort((_a, _b) => 0.5 - Math.random())

const getHeight = (animation: string) => {
  if (animation.includes('one')) {
    return 65
  }
  if (animation.includes('two')) {
    return 40
  }
  if (animation.includes('three')) {
    return 50
  }
  if (animation.includes('four')) {
    return 60
  }
}

type AudienceGraphProps = {
  audienceAnswers: { [key: string]: number }
  isAudienceGraphAnimating: boolean
  answers: string[]
}

export const AudienceGraph = ({
  audienceAnswers,
  isAudienceGraphAnimating,
  answers
}: AudienceGraphProps) => {
  return (
    <div
      className={classNames(
        'z-20 fixed top-[130px] sm:top-[180px] left-[calc(50%-100px)] w-[200px] h-[200px]',
        'rounded-md border border-[3px] border-yellow-600 bg-[rgb(30,58,138,0.6)]',
        'grid grid-cols-4 flex justify-center text-center'
      )}
    >
      {audienceAnimations.map((animation, index) => {
        if (answers[index] === '') {
          return
        }
        return (
          <div
            key={index}
            className={classNames(
              'flex flex-col grid grid-rows-[25px_140px_30px]',
              {
                'col-start-1': index === 0,
                'col-start-2': index === 1,
                'col-start-3': index === 2,
                'col-start-4': index === 3
              }
            )}
          >
            {!isAudienceGraphAnimating && (
              <span className="text-blue-100 row-start-1 flex justify-center items-center">
                {audienceAnswers[index + 1]}%
              </span>
            )}
            <div className="row-start-2 flex justify-center items-end">
              <span
                {...(Object.keys(audienceAnswers).length &&
                  !isAudienceGraphAnimating && {
                    style: {
                      minHeight: `${audienceAnswers[index + 1]}%`,
                      maxHeight: `${audienceAnswers[index + 1]}%`,
                      height: `${getHeight(animation)}px`
                    }
                  })}
                className={classNames(
                  'min-h-[0%] max-h-[100%] w-5 bg-yellow-600 shadow-md transition-all duration-300',
                  animation
                )}
              />
            </div>
            <span className="row-start-3 text-xl text-blue-100 font-extrabold flex justify-center items-center">
              {getAnswerLetter(index + 1)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
