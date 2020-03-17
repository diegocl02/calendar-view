import { applyMiddleware, createStore } from 'redux'
import moment from 'moment'
import axios from 'axios';
import thunk from 'redux-thunk'
import { config } from '../shared/config'

const initialState = {
    date: moment(),
    reminders: []
}

const middleware = applyMiddleware(thunk)

export const store = createStore(
    reducer,
    initialState,
    middleware
)

function reducer(state, { type, payload }) {
    switch (type) {
        case "ADD_REMINDER":
            return {
                ...state,
                reminders: [
                    ...state.reminders,
                    {
                        ...payload,
                        isFetchingWeather: "Fetching weather for this event..."
                    }
                ]
            }
        case "DEL_REMINDER":
            return {
                ...state,
                reminders: state.reminders.filter(remind => remind.id !== payload)
            }
        case "DEL_GROUP":
            return {
                ...state,
                reminders: state.reminders
                    .filter(remind => !moment(remind.time).isSame(moment(payload), 'day'))
            }
        case "UPDATE_REMINDER":
            return {
                ...state,
                reminders: [
                    ...state.reminders.filter(remind => remind.id !== payload.id),
                    {
                        ...payload,
                        isFetchingWeather: "Fetching weather for this event..."
                    }
                ]
            }
        case "FETCH_WEATHER":
            return {
                ...state,
                reminders: [
                    ...state.reminders.filter(remind => remind.id !== payload.reminder.id),
                    {
                        ...payload.reminder,
                        weather: payload.weatherInfo.data.list.filter(weather => {
                            const dur = moment.duration((weather.dt * 1000) - payload.reminder.time)
                            return dur.asHours() > (config.api.HOUR_RES * -1)
                                && dur.asHours() < config.api.HOUR_RES
                        })[0],
                        isFetchingWeather: false
                    }
                ]
            }
        case "UPDATE_MONTH":
            return {
                ...state,
                date: payload
            }
        default:
            return state
    }
}

export const updateCurrentMonthAction = (date) => ({
    type: "UPDATE_MONTH",
    payload: date
})

export const addReminderAction = (reminder) => ({
    type: "ADD_REMINDER",
    payload: reminder
})

export const updateReminderAction = (reminder) => ({
    type: "UPDATE_REMINDER",
    payload: reminder
})

export const delReminderAction = (reminderId) => ({
    type: "DEL_REMINDER",
    payload: reminderId
})

export const delDayRemindersAction = (date) => ({
    type: "DEL_GROUP",
    payload: date
})

export const fetchWeatherInfo = (reminder) => {
    if (!reminder.city || reminder.city === "") {
        return { type: "" }
    }
    return (dispatch) => {
        axios.get(`${config.api.URL}${reminder.city}&appid=${config.api.KEY}`)
            .then(res => res)
            .then(res => {
                dispatch({
                    type: "FETCH_WEATHER",
                    payload: {
                        reminder: reminder,
                        weatherInfo: res
                    }
                })
            })
            .catch(err => {
                console.log(`There was an error while trying to fecth the weather: ${err}`)
            })
    }
}