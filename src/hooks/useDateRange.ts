import { Moment } from 'moment'
import { useState } from 'react'

const useDateRange = () => {
  const [value, setValue] = useState<{
    startTime: Moment
    endTime: Moment
  }>()

  // startTime: moment().subtract(7, "days").set({ hours: 0, minutes: 0, seconds: 0 }),
  //   endTime: moment().set({ hours: 23, minutes: 59, seconds: 59 }),

  const setTimerange = (start: Moment, end: Moment) => {
    if (start > end) throw new Error('start time must be earlier than end time')

    setValue(() => ({
      startTime: start,
      endTime: end,
    }))
  }
  return [value, setTimerange] as const
}

export default useDateRange
