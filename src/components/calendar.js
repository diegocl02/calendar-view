import React from 'react'
import { DayBox } from './day-box'
import { useSelector, useDispatch } from 'react-redux'
import {
    addReminderAction,
    updateReminderAction,
    fetchWeatherInfo,
    updateCurrentMonthAction,
    delReminderAction
} from '../redux/redux'
import { v1 as uuidv1 } from 'uuid'
import moment from 'moment'
import { getDaysArray } from '../shared/utils'

export const Calendar = () => {
    const reminders = useSelector((state) => state.reminders)
    const date = useSelector((state) => state.date)
    const dispatch = useDispatch()
    const addReminder = (reminder) => dispatch(addReminderAction(reminder))
    const updateReminder = (reminder) => dispatch(updateReminderAction(reminder))
    const fetchWeather = (reminder) => dispatch(fetchWeatherInfo(reminder))
    const updateMonth = (date) => dispatch(updateCurrentMonthAction(date))
    const delReminder = (reminderId) => dispatch(delReminderAction(reminderId))

    const handleNewReminder = (reminder) => {
        const newReminder = {
            ...reminder,
            id: uuidv1()
        }
        fetchWeather(newReminder)
        addReminder(newReminder)
    }
    const handleDeleteReminder = (reminder) => {
        delReminder(reminder.id)
    }
    const handleEditedReminder = (reminder) => {
        fetchWeather(reminder)
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
                            week.map((day, dayIndex) => <DayBox
                                key={`day-${dayIndex}`}
                                {...day}
                                handleNewReminder={handleNewReminder}
                                handleEditedReminder={handleEditedReminder}
                                handleDeleteReminder={handleDeleteReminder}
                                style={{
                                    ...dayIndex === 0 || dayIndex === 6
                                        ? {backgroundColor:"#f2f2f2", color: "#4a76a6"}
                                        : {}
                                }}
                            />)
                        }
                    </div>
                })
            }
        </div>
    </div>
}