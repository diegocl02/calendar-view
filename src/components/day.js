import React, { useState } from 'react'
import { Dialog } from './dialog'
import { ReminderForm } from './reminder-form'
import { config } from '../shared/config'
import { kelvinToCelsius } from '../shared/utils'

export const Day = ({
    date,
    dayNumber,
    reminders,
    handleNewReminder,
    handleEditedReminder,
    isDisabled
}) => {
    const [showNewReminderModal, setshowNewReminderModal] = useState(false)
    const [showEditingReminderModal, setEditingReminderModal] = useState(false)
    const [selectedReminder, setSelectedReminder] = useState({})

    const handleSubmitNewReminder = (newReminder) => {
        setshowNewReminderModal(false)
        handleNewReminder(newReminder)
    }
    const handleSubmitEditedReminder = (editedReminder) => {
        setEditingReminderModal(false)
        handleEditedReminder(editedReminder)
    }
    console.log(selectedReminder)
    return [<div key={'day'}
        className={`day-container${isDisabled ? ' disabled' : ''}`}
        onClick={(e) => {
            if (isDisabled)
                return
            e.preventDefault()
            setshowNewReminderModal(true)
        }}>
        <div key={'day-number'} className="day-number">
            <span>{dayNumber}</span>
        </div>
        <div key={'day-reminder'} className="reminders-container">
            {
                reminders.map((reminder, index) => {
                    return <div
                        key={index}
                        className={"mini-reminder"}
                        style={{ backgroundColor: reminder.color }}
                        onClick={(e) => {
                            if (isDisabled)
                                return
                            e.stopPropagation()
                            setEditingReminderModal(true)
                            setSelectedReminder(reminder)
                        }}>
                        {reminder.title}
                    </div>
                })
            }
        </div>
    </div>,
    showNewReminderModal
        ? <Dialog
            key={"dialog"}
            handleCloseDialog={() => setshowNewReminderModal(false)}>
            <div className={"edit-dialog"}>
                <h3> Add New Reminder </h3>
                <ReminderForm
                    defaultReminder={{
                        color: config.theme.reminderColors[0],
                        time: new Date(date).getTime()
                    }}
                    date={date}
                    onSubmit={handleSubmitNewReminder}
                    buttonLabel={"Add Reminder"} />
            </div>
        </Dialog >
        : null,
    showEditingReminderModal && selectedReminder
        ? <Dialog
            key={"dialog"}
            handleCloseDialog={() => setEditingReminderModal(false)}>
            <div className={"edit-dialog"}>
                <h3> Edit Reminder </h3>
                <ReminderForm
                    defaultReminder={selectedReminder}
                    onSubmit={handleSubmitEditedReminder}
                    buttonLabel={"Update Reminder"} />
                <div className={"weather"}>
                    {selectedReminder.weather && selectedReminder.weather.main
                        && <span className={"forecast-span"}>
                            <b>Forecast for this event</b>: {`${kelvinToCelsius(selectedReminder.weather.main.temp)} C°`}
                        </span>}
                    {selectedReminder.weather && selectedReminder.weather.weather
                        && <span className={"forecast-span"}> - {selectedReminder.weather.weather[0].main} </span>}
                    {selectedReminder.weather && selectedReminder.weather.weather
                        && <img
                            className={"weather-icon"}
                            alt={`weather-icon`}
                            src={`http://openweathermap.org/img/wn/${selectedReminder.weather.weather[0].icon}@2x.png`}>
                        </img>}
                </div>
            </div>
        </Dialog>
        : null
    ]
}