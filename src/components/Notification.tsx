import classNames from 'classnames'
import { BaseSyntheticEvent, RefObject } from 'react'
import { ScoreData } from '../config/types'

type NotificationProps = {
  notificationText: string
  isDuckNotification?: boolean
  name?: string
  rank?: number
  isResultSubmitted?: boolean
  inputRef?: RefObject<HTMLInputElement>
  scoreData?: ScoreData
  handleNotificationClick: () => void
  handleFormSubmit?: (e: BaseSyntheticEvent) => void
}

export const Notification = ({
  notificationText,
  isDuckNotification,
  name,
  rank,
  isResultSubmitted,
  inputRef,
  scoreData,
  handleNotificationClick,
  handleFormSubmit
}: NotificationProps) => {
  return (
    <div className="w-full h-full absolute z-30 select-none">
      <div
        style={{ background: 'rgba(239, 239, 240, 0.6)' }}
        className={classNames(
          'w-[300px] h-[300px] mx-auto flex flex-col justify-center items-center border border-2',
          {
            'mt-[200px]': !isDuckNotification,
            'mt-[90px]': isDuckNotification
          }
        )}
      >
        <p className="mx-2 text-center text-xl">{notificationText}</p>
        {rank && !name && (
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col mt-4 mb-2 mx-4 items-center text-center"
          >
            <span>You are ranked {rank}. Please enter your name</span>
            <input
              ref={inputRef}
              type="text"
              className="mt-8 mb-2"
              placeholder="Your name"
              autoFocus
              required
            />
            <button
              type="submit"
              className="bg-[black] text-white w-[150px] py-1 rounded mt-5"
            >
              Ok
            </button>
          </form>
        )}
        {isResultSubmitted && (
          <div className="mt-2">
            {scoreData?.map(({ name, score }, index) => {
              return (
                <div key={index}>
                  {index + 1}. {name} - {score} points
                </div>
              )
            })}
          </div>
        )}
        {(!isDuckNotification || !rank || name) && (
          <button
            onClick={handleNotificationClick}
            className="bg-[black] text-white w-[150px] py-1 rounded mt-5"
          >
            Ok
          </button>
        )}
      </div>
    </div>
  )
}
