import classNames from 'classnames'

type NotificationProps = {
  notificationText: string
  isDuckNotification?: boolean
  handleNotificationClick: () => void
}

export const Notification = ({
  notificationText,
  isDuckNotification,
  handleNotificationClick
}: NotificationProps) => {
  return (
    <div className="w-full h-full absolute z-30">
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
        <button
          onClick={handleNotificationClick}
          className="bg-[black] text-white w-[150px] py-1 rounded mt-5"
        >
          Ok
        </button>
      </div>
    </div>
  )
}
