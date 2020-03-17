import React, { useState } from 'react'
import { ColorSelector } from './color-selector'
import TextField from '@material-ui/core/TextField'
import { config } from '../shared/config'
import moment from 'moment'

export const ReminderForm = ({ defaultReminder, onSubmit, buttonLabel }) => {
    const [newReminder, setNewReminder] = useState(defaultReminder)
    const [errorMsg, setErrorMsg] = useState(null)

    const onTitleChange = (event) => {
        setErrorMsg(null)
        setNewReminder({ ...newReminder, title: event.target.value.slice(0, 30) })
    }
    const onDescriptionChange = (event) => {
        setNewReminder({ ...newReminder, description: event.target.value })
    }
    const onCityChange = (event) => {
        setNewReminder({ ...newReminder, city: event.target.value })
    }
    const onTimeChange = (event) => {
        setErrorMsg(null)
        setNewReminder({ ...newReminder, time: new Date(event.target.value).getTime() })
    }
    const onColorChange = (color) => {
        setNewReminder({ ...newReminder, color: color })
    }
    const validateFields = (newReminder) => {
        if (newReminder.title === undefined || newReminder.title === "") {
            setErrorMsg("You must use a title")
            return false
        }
        if (newReminder.time === undefined || isNaN(newReminder.time)) {
            setErrorMsg("You must pick a date")
            return false
        }
        return true
    }
    return <div key={"form"} className={"form-container"}>
        <input
            className={"input-title"}
            type="text"
            placeholder="Title"
            value={newReminder.title || ""}
            onChange={onTitleChange}
            maxLength="30"
        />
        <input
            className={"input-description"}
            type="text"
            placeholder="Description"
            value={newReminder.description || ""}
            onChange={onDescriptionChange}
        />
        <input
            className={"input-description"}
            type="text"
            placeholder="City"
            value={newReminder.city || ""}
            onChange={onCityChange}
        />
        <ColorSelector
            colors={config.theme.reminderColors}
            selectedIndex={config.theme.reminderColors
                .findIndex(color => newReminder.color === color)}
            onColorSelected={onColorChange} />
        <TextField
            id="time"
            label="Set time"
            type="datetime-local"
            defaultValue={moment(newReminder.time).format("YYYY-MM-DDTHH:mm")}
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
            onClick={(e) => {
                e.preventDefault()
                if (validateFields(newReminder))
                    onSubmit(newReminder)
            }}
            type="submit">
            {buttonLabel}
        </button>
        {
            errorMsg && <span style={{
                color: "red",
                fontSize: "0.8rem",
                height: "1rem",
                marginBottom: "1rem"
            }}>
                {errorMsg}
            </span>
        }
    </div>
}