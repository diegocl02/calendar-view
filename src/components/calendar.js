import React, { useState } from 'react'
import { Day } from './day'
import { useSelector, useDispatch } from 'react-redux'
import { addReminderAction } from '../redux/redux'
import { v1 as uuidv1 } from 'uuid'
import moment from 'moment'

const WEEKS_PER_MONTH = 5
const DAYS_PER_WEEK = 7

const getFirstDayOfMonth = (date) => {
    return date.startOf("month").day()
}

const getDaysArray = (date, reminders) => {
    let daysArray = []
    let dayCount = 0
    let startDay = getFirstDayOfMonth(date)

    for (let i = 0; i < WEEKS_PER_MONTH; i++) {
        let week = []
        for (let j = 0; j < DAYS_PER_WEEK; j++) {
            if (j === startDay || dayCount > 0) {
                dayCount++;
            }
            if (dayCount <= date.daysInMonth())
                week.push({ dayNumber: dayCount })
            else
                week.push({ dayNumber: 0 })
        }
        daysArray.push(week)
    }
    return daysArray
}

export const Calendar = (props) => {
    const reminders = useSelector((state) => state.reminders)
    const date = useSelector((state) => state.date)
    const dispatch = useDispatch()
    const addReminder = (reminder) => dispatch(addReminderAction(reminder))

    const handleNewReminder = (reminder) => {
        addReminder({
            ...reminder,
            id: uuidv1()
        })
    }
    const weekdays = moment.weekdaysShort()
    const dayArray = getDaysArray(date)
    console.log(dayArray)
    return <div className={"calendar-container"}>
        <h1> Jobsity Calendar - Reminder</h1>
        <div className={"header-row"}>
            {
                weekdays.map(weekday => {
                    return <div key={weekday} className={"header-container"}>
                        {weekday}
                    </div>
                })
            }
        </div>
        <div className={"days-container"}>
            {
                dayArray.map(week => {
                    return <div className={"week-container"}>
                        {
                            week.map(day => <Day
                                number={day.dayNumber}
                                reminders={reminders}
                                handleNewReminder={handleNewReminder}
                            />)
                        }
                    </div>
                })
            }
        </div>
    </div>
}