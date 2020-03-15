import React, { useState } from 'react'
import { Dialog } from './dialog'
import TextField from '@material-ui/core/TextField';

export const Day = ({ date, number, reminders, handleNewReminder }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [newReminder, setNewReminder] = useState({})

    const onTitleChange = (event) => {
        setNewReminder({ ...newReminder, title: event.target.value })
    }
    const onTimeChange = (event) => {
        console.log(new Date(event.target.value).getTime())
        setNewReminder({ ...newReminder, time: new Date(event.target.value).getTime() })
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
                    className={"input-title"}
                    type="text"
                    placeholder="Title"
                    value={newReminder.title || ""}
                    onChange={onTitleChange}
                />
                <input
                    className={"input-description"}
                    type="text"
                    placeholder="Description"
                    value={newReminder.title || ""}
                    onChange={onTitleChange}
                />
                <TextField
                    id="time"
                    label="Set time"
                    type="datetime-local"
                    defaultValue={date.format("YYYY-MM-DDThh:mm")}
                    className={"date-picker"}
                    onChange={onTimeChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300,
                    }}
                />
                <button
                    className={"submit-btn"}
                    onClick={handleSubmit}
                    type="submit">
                    Add reminder
                </button>
            </div>
        </Dialog>
        : null
    ]
}