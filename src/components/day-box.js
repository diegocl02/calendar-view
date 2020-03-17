import React, { useState } from 'react'
import { Dialog } from './dialog'
import { ReminderForm } from './reminder-form'
import { config } from '../shared/config'
import { kelvinToCelsius } from '../shared/utils'

export const DayBox = ({
    date,
    dayNumber,
    reminders,
    handleNewReminder,
    handleEditedReminder,
    handleDeleteReminder,
    handleDeleteDayReminders,
    isDisabled,
    style
}) => {
    const [showNewReminderModal, setshowNewReminderModal] = useState(false)
    const [showEditingReminderModal, setEditingReminderModal] = useState(false)
    const [selectedReminderId, setSelectedReminderId] = useState({})

    const handleSubmitNewReminder = (newReminder) => {
        setshowNewReminderModal(false)
        handleNewReminder(newReminder)
    }
    const handleSubmitEditedReminder = (editedReminder) => {
        setEditingReminderModal(false)
        handleEditedReminder(editedReminder)
    }
    const handleDelReminder = (reminderDeleted) => {
        setEditingReminderModal(false)
        handleDeleteReminder(reminderDeleted)
    }
    const selectedReminder = reminders.find(reminder => selectedReminderId === reminder.id)
    return [<div key={'day'}
        className={`day-container`}
        style={{ ...style }}
        onClick={(e) => {
            if (isDisabled)
                return
            e.preventDefault()
            setshowNewReminderModal(true)
        }}>
        <div
            key={'day-number'}
            className={`day-number ${isDisabled ? ' disabled' : ''}`}>
            <span data-testid="day-number">{dayNumber}</span>
            {
                reminders.length > 0 && <span
                className="delete-all" 
                onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteDayReminders(date)
                }}>
                    Delete all
                </span>
            }
        </div>
        <div key={'day-reminder'} className="reminders-container">
            {
                reminders.map((reminder, index) => {
                    return <div
                        key={index}
                        className={"mini-reminder"}
                        style={{
                            backgroundColor: isDisabled
                                ? 'gainsboro'
                                : reminder.color
                        }}
                        onClick={(e) => {
                            if (isDisabled)
                                return
                            e.stopPropagation()
                            setEditingReminderModal(true)
                            setSelectedReminderId(reminder.id)
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
                <h3> Create New Reminder </h3>
                <ReminderForm
                    defaultReminder={{
                        color: config.theme.reminderColors[0],
                        time: new Date(date).getTime()
                    }}
                    date={date}
                    onSubmit={handleSubmitNewReminder}
                    buttonLabel={"Create"} />
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
                    buttonLabel={"Update"} />

                <button
                    className={"delete-btn"}
                    onClick={(e) => {
                        e.preventDefault()
                        handleDelReminder(selectedReminder)
                    }}
                    type="submit">
                    {'Delete'}
                </button>

                <div className={"weather"}>
                    {
                        selectedReminder.isFetchingWeather
                            ? <span className={"fetching-span"}>
                                {selectedReminder.isFetchingWeather}</span>
                            : <>
                                {selectedReminder.weather && selectedReminder.weather.main
                                    && <span className={"forecast-span"}>
                                        <b>Forecast for this event</b>:
                            {` ${kelvinToCelsius(selectedReminder.weather.main.temp)} C°`}
                                    </span>}
                                {selectedReminder.weather && selectedReminder.weather.weather
                                    && <span className={"forecast-span"}> -
                                {` ${selectedReminder.weather.weather[0].main}`} </span>}
                                {selectedReminder.weather && selectedReminder.weather.weather
                                    && <img
                                        className={"weather-icon"}
                                        alt={`weather-icon`}
                                        src={`${config.api.IMG_URL}${selectedReminder.weather.weather[0].icon}@2x.png`}>
                                    </img>}
                            </>
                    }
                </div>
            </div>
        </Dialog>
        : null
    ]
}