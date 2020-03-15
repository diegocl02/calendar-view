import { createStore } from 'redux'
import { v1 as uuidv1 } from 'uuid'
import moment from 'moment'

const initialState = {
    date: moment(),
    reminders: [
        {
            id: uuidv1(),
            time: 1584208263,
            city: "Sao Paulo",
            color: "#F7F9F8",
            title: "Pet"
        },
        {
            id: uuidv1(),
            time: 1584208263,
            city: "Sao Paulo",
            color: "#F7F9F8",
            title: "Pet"
        }
    ]
}

export const store = createStore(
    reducer,
    initialState
)

function reducer(state, {type, payload}) {
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
        default:
            return state
    }
}

export const addReminderAction = (reminder) => ({
    type: "ADD_REMINDER",
    payload: reminder
})

export const delReminderAction = (reminderId) => ({
    type: "DEL_REMINDER",
    payload: reminderId
})