import React from 'react'
import { Day } from './day'
import { useSelector, useDispatch } from 'react-redux'
import {
    addReminderAction,
    updateReminderAction,
    fetchWeatherInfo,
    updateCurrentMonth
} from '../redux/redux'
import { v1 as uuidv1 } from 'uuid'
import moment from 'moment'

const WEEKS_PER_MONTH = 5
const DAYS_PER_WEEK = 7

const getFirstDayOfMonth = (date) => {
    return date.startOf("month").day()
}

const getFirstDateOfNextMonth = (date) => {
    let newDate = moment(date)
    return newDate.add(1, 'M').startOf("month").date()
}

const getEndDateOfPreviousMonth = (date) => {
    let newDate = moment(date)
    return newDate.subtract(1, 'M').endOf("month").date()
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
    let startNextMonth = getFirstDateOfNextMonth(date)
    let startOfPreviousMonth = getEndDateOfPreviousMonth(date) - startDay + 1

    for (let i = 0; i < WEEKS_PER_MONTH; i++) {
        let week = []
        if (i === 0) {
            for (let j = 0; j < startOfPreviousMonth && j !== startDay; j++) {
                let newDate = moment(`${moment(date).subtract(1, 'M')
                    .format("YYYY-MM-")}${startNextMonth}`, "YYYY-MM-D")
                week.push({
                    date: newDate,
                    dayNumber: startOfPreviousMonth,
                    reminders: getRemindersByDay(newDate, reminders),
                    isDisabled: true
                })
                startOfPreviousMonth++
            }
        }
        for (let j = 0; j < DAYS_PER_WEEK; j++) {
            if (j === startDay || dayCount > 0) {
                dayCount++;
            }
            if (dayCount > 0 && dayCount <= date.daysInMonth()) {
                let newDate = moment(`${date.format("YYYY-MM-")}${dayCount}`, "YYYY-MM-D")
                week.push({
                    date: newDate,
                    dayNumber: dayCount,
                    reminders: getRemindersByDay(newDate, reminders)
                })
            }
            else if (i === 4) {
                let newDate = moment(`${moment(date).add(1, 'M')
                    .format("YYYY-MM-")}${startNextMonth}`, "YYYY-MM-D")
                week.push({
                    date: newDate,
                    dayNumber: startNextMonth,
                    reminders: getRemindersByDay(newDate, reminders),
                    isDisabled: true
                })
                startNextMonth++;
            }
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
    const fetchWeather = (reminder) => dispatch(fetchWeatherInfo(reminder))
    const updateMonth = (date) => dispatch(updateCurrentMonth(date))

    const handleNewReminder = (reminder) => {
        const newReminder = {
            ...reminder,
            id: uuidv1()
        }
        fetchWeather(newReminder)
        addReminder(newReminder)
    }
    const handleEditedReminder = (reminder) => {
        updateReminder(reminder)
    }
    const handlePrev = (e) => {
        updateMonth(moment(date).subtract(1, 'M'))
    }
    const handleNext = (e) => {
        updateMonth(moment(date).add(1, 'M'))
    }
    const weekdays = moment.weekdaysShort()
    const dayArray = getDaysArray(date, reminders)
    return <div className={"calendar-container"}>
        <div className={"month-container"}>
            <div
                className="month-btn"
                onClick={handlePrev}>
                <h3>Prev</h3>
            </div>

            <h2> {date.format("MMMM")} {date.format("YYYY")}</h2>

            <div
                className="month-btn"
                onClick={handleNext}>
                <h3>Next</h3>
            </div>
        </div>
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
                                {...day}
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