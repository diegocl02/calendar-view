import React from 'react'
import { Day } from './day'
import { useSelector, useDispatch } from 'react-redux'
import { addReminderAction, updateReminderAction, delReminderAction } from '../redux/redux'
import { v1 as uuidv1 } from 'uuid'
import moment from 'moment'

const WEEKS_PER_MONTH = 5
const DAYS_PER_WEEK = 7

const getFirstDayOfMonth = (date) => {
    return date.startOf("month").day()
}

const getRemindersByDay = (date, reminders) => {
    return reminders.filter(reminder =>
        moment(reminder.time)
            .isSame(moment(date, "YYYY-MM-D"), 'day')
    ).sort((remA, remB) => remA.time - remB.time)
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
            if (dayCount <= date.daysInMonth()){
                let newDate = moment(`${date.format("YYYY-MM-")}${dayCount}`, "YYYY-MM-D")
                week.push({
                    date: newDate,
                    dayNumber: dayCount,
                    reminders: getRemindersByDay(newDate, reminders)
                })
            }
            else
                week.push({ dayNumber: 0, reminders: [] })
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
    const updateReminder = (reminder) => dispatch(updateReminderAction(reminder))

    const handleNewReminder = (reminder) => {
        addReminder({
            ...reminder,
            id: uuidv1()
        })
    }
    const handleEditedReminder = (reminder) => {
        updateReminder(reminder)
    }
    const weekdays = moment.weekdaysShort()
    const dayArray = getDaysArray(date, reminders)
    return <div className={"calendar-container"}>
        <h2> {date.format("MMMM")} {date.format("YYYY")}</h2>
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
                dayArray.map((week, weekIndex) => {
                    return <div key={`week-${weekIndex}`} className={"week-container"}>
                        {
                            week.map((day, dayIndex) => <Day
                                key={`day-${dayIndex}`}
                                date={day.date}
                                number={day.dayNumber}
                                reminders={day.reminders}
                                handleNewReminder={handleNewReminder}
                                handleEditedReminder={handleEditedReminder}
                            />)
                        }
                    </div>
                })
            }
        </div>
    </div>
}