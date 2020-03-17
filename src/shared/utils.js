import moment from 'moment'

const DAYS_PER_WEEK = 7

export const kelvinToCelsius = (kelvin) => {
    if (isNaN(kelvin))
        return "-"
    return (kelvin - 273.15).toFixed(1)
}

const getFirstDayOfMonth = (date) => {
    return moment(date.startOf("month"))
}

const getFirstDateOfNextMonth = (date) => {
    let newDate = moment(date)
    return moment(newDate.add(1, 'M').startOf("month"))
}

const getEndDateOfPreviousMonth = (date) => {
    let newDate = moment(date)
    return newDate.subtract(1, 'M').endOf("month")
}

const getRemindersByDay = (date, reminders) => {
    return reminders
        .filter(reminder => moment(reminder.time).isSame(date, 'day'))
        .sort((remA, remB) => remA.time - remB.time)
}

export const getDaysArray = (currentDate, reminders) => {
    let daysArray = []
    let dayCount = 1
    let startDay = getFirstDayOfMonth(currentDate)
    let startNextMonth = getFirstDateOfNextMonth(currentDate)
    let startOfPreviousMonth = getEndDateOfPreviousMonth(currentDate).subtract(startDay.day() - 1, 'd')

    for (let i = 0; dayCount <= currentDate.daysInMonth(); i++) {
        let week = []
        let days = 0
        if (i === 0) {
            while (days !== startDay.day()) {
                let newDate = moment(startOfPreviousMonth)
                week.push({
                    date: newDate,
                    dayNumber: newDate.date(),
                    reminders: getRemindersByDay(newDate, reminders),
                    isDisabled: true
                })
                startOfPreviousMonth.add(1, 'd')
                days++
            }
        }
        while (days < DAYS_PER_WEEK) {
            if (dayCount <= currentDate.daysInMonth()) {
                let newDate = moment(startDay)
                week.push({
                    date: newDate,
                    dayNumber: dayCount,
                    reminders: getRemindersByDay(newDate, reminders)
                })
                startDay.add(1, 'd')
                dayCount++
            }
            else {
                let newDate = moment(startNextMonth)
                week.push({
                    date: newDate,
                    dayNumber: newDate.date(),
                    reminders: getRemindersByDay(newDate, reminders),
                    isDisabled: true
                })
                startNextMonth.add(1, 'd')
            }
            days++;
        }
        daysArray.push(week)
    }
    return daysArray
}