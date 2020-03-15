import React, { useState } from 'react'
import { Dialog } from './dialog'
import DateTimePicker from 'react-datetime-picker';

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

    return [<div key={'day'} className="day-container" onClick={handleOpenDialog}>
        <div key={'day-number'} className="day-number">
            <span>{number}</span>
        </div>
        <div key={'day-reminder'} className="reminders-container">
            {
                reminders.map((reminder, index) => {
                    return <div
                        key={index}
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
            key={"dialog"}
            handleCloseDialog={handleCloseDialog}>
            <div key={"form"} className={"form-container"}>
                <input
                    className={"input"}
                    type="text"
                    placeholder="Add Title"
                    value={newReminder.title || ""}
                    onChange={onTitleChange}
                />
                <DateTimePicker
                    onChange={this.onChange}
                    value={this.state.date}
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