import React, { useState } from 'react'
import { Dialog } from './dialog'
import { ReminderForm } from './reminder-form'

import { config } from '../shared/config'

export const Day = ({ date, number, reminders, handleNewReminder, handleEditedReminder }) => {
    const [showNewReminderModal, setshowNewReminderModal] = useState(false)
    const [showEditingReminderModal, setEditingReminderModal] = useState(false)
    const [selectedReminder, setSelectedReminder] = useState({})

    const handleSubmitNewReminder = (newReminder) => {
        setshowNewReminderModal(false)
        handleNewReminder(newReminder)
    }
    const handleSubmitEditedReminder = (editedReminder) => {
        setEditingReminderModal(false)
        console.log(editedReminder)
        handleEditedReminder(editedReminder)
    }
    return [<div key={'day'}
        className="day-container"
        onClick={(e) => {
            e.preventDefault()
            setshowNewReminderModal(true)
        }}>
        <div key={'day-number'} className="day-number">
            <span>{number}</span>
        </div>
        <div key={'day-reminder'} className="reminders-container">
            {
                reminders.map((reminder, index) => {
                    return <div
                        key={index}
                        className={"mini-reminder"}
                        style={{ backgroundColor: reminder.color }}
                        onClick={(e) => {
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
            <ReminderForm
                defaultReminder={{
                    color: config.theme.reminderColors[0],
                    time: new Date(date).getTime()
                }}
                date={date}
                onSubmit={handleSubmitNewReminder}
                buttonLabel={"Add Reminder"} />
        </Dialog>
        : null,
    showEditingReminderModal && selectedReminder
        ? <Dialog
            key={"dialog"}
            handleCloseDialog={() => setEditingReminderModal(false)}>
            <ReminderForm
                defaultReminder={selectedReminder}
                date={date}
                onSubmit={handleSubmitEditedReminder}
                buttonLabel={"Update Reminder"} />
        </Dialog>
        : null
    ]
}