import { createStore } from 'redux'
import { v1 as uuidv1 } from 'uuid'
import moment from 'moment'

const initialState = {
    date: moment(),
    reminders: [
        {
            id: uuidv1(),
            time: 1584208263000,
            city: "Sao Paulo",
            color: "#878674",
            title: "Travel"
        },
        {
            id: uuidv1(),
            time: 1584208263000,
            city: "Sao Paulo",
            color: "#A8CDE1",
            title: "Pet"
        }
    ]
}

export const store = createStore(
    reducer,
    initialState
)

function reducer(state, { type, payload }) {
    console.log('reducer',payload)
    switch (type) {
        case "ADD_REMINDER":
            return {
                ...state,
                reminders: [
                    ...state.reminders,
                    payload
                ]
            }
        case "DEL_REMINDER":
            return {
                ...state,
                reminders: state.reminders.filter(remind => remind.id !== payload)
            }
        case "UPDATE_REMINDER":
            return {
                ...state,
                reminders: [
                    ...state.reminders.filter(remind => remind.id !== payload.id),
                    payload
                ]
            }
        default:
            return state
    }
}

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