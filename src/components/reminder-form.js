import React, { useState } from 'react'
import { ColorSelector } from './color-selector'
import TextField from '@material-ui/core/TextField'
import { config } from '../shared/config'
import moment from 'moment'

export const ReminderForm = ({defaultReminder, onSubmit, date, buttonLabel}) => {
    const [newReminder, setNewReminder] = useState(defaultReminder)

    const onTitleChange = (event) => {
        setNewReminder({ ...newReminder, title: event.target.value })
    }
    const onDescriptionChange = (event) => {
        setNewReminder({ ...newReminder, description: event.target.value })
    }
    const onCityChange = (event) => {
        setNewReminder({ ...newReminder, city: event.target.value })
    }
    const onTimeChange = (event) => {
        setNewReminder({ ...newReminder, time: new Date(event.target.value).getTime() })
    }
    const onColorChange = (color) => {
        setNewReminder({ ...newReminder, color: color})
    }
    return <div key={"form"} className={"form-container"}>
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
            defaultValue={moment(newReminder.time).format("YYYY-MM-DDThh:mm")}
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
                onSubmit(newReminder)
            }}
            type="submit">
            {buttonLabel}
    </button>
    </div>
}