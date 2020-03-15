import React, { useState } from 'react'
import { Dialog } from './dialog'

export const Day = ({ number, reminders, handleNewReminder }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [newReminder, setNewReminder] = useState({})

    const onTitleChange = (event) => {
        setNewReminder({ ...newReminder, title: event.target.value })
    }
    const handleCloseDialog = () => {
        setShowDialog(false)
    }
    const handleOpenDialog = (e) => {
        e.preventDefault()
        setShowDialog(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setShowDialog(false)
        handleNewReminder(newReminder)
    }
    const handleClickReminder = (e) => {
        e.stopPropagation()
    }

    return [<div className="day-container" onClick={handleOpenDialog}>
        <div className="day-number">
            <span>{number}</span>
        </div>
        <div className="reminders-container">
            {
                reminders.map(reminder => {
                    return <div
                        className={"mini-reminder"}
                        onClick={handleClickReminder}>
                        {reminder.title}
                    </div>
                })
            }
        </div>
    </div>,
    showDialog
        ? <Dialog
            handleCloseDialog={handleCloseDialog}>
            <div className={"form-container"}>
                <input
                    className={"input"}
                    type="text"
                    placeholder="Add Title"
                    value={newReminder.title || ""}
                    onChange={onTitleChange}
                />
                <button
                    onClick={handleSubmit}
                    type="submit">
                    Add reminder
                </button>
            </div>
        </Dialog>
        : null
    ]
}