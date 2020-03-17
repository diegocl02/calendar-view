import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DayBox } from './components/day-box'
import { ReminderForm } from './components/reminder-form'
import moment from 'moment'

describe('DayBox Component',() => {
    test('It should render the DayBox component properly', () => {
        const dayProps = {
            date: moment(),
            dayNumber: 4,
            reminders: [],
            handleNewReminder: () => { },
            handleEditedReminder: () => { },
            isDisabled: false
        }
        const { queryByText } = render(<DayBox {...dayProps} />)
    
        expect(queryByText(/4/i)).toBeTruthy();
    })
    test('It should create a new reminder item inside the DayBox', () => {
        const dayProps = {
            date: moment(),
            dayNumber: 10,
            reminders: [{
                id: 'xyxyxy',
                time: 1584208263000,
                city: "Sao Paulo",
                color: "#878674",
                title: "see dad"
            }],
            handleNewReminder: () => { },
            handleEditedReminder: () => { },
            isDisabled: false
        }
        const { queryByText } = render(<DayBox {...dayProps} />)
    
        expect(queryByText(/see dad/i)).toBeTruthy();
    })
})

describe('ReminderForm Component', () => {
    test('It should render the component properly', () => {
        const formProps = {
            defaultReminder: {
                title: "",
                time: new Date().getTime()
            }
        }
        const { queryByPlaceholderText } = render(<ReminderForm {...formProps} />)
        expect(queryByPlaceholderText(/Title/i)).toBeTruthy();
    }) 
    test('It should accept at most 30 characters in the title input', () => {
        const formProps = {
            defaultReminder: {
                title: "",
                time: new Date().getTime()
            }
        }
        const { getByPlaceholderText } = render(<ReminderForm {...formProps} />)
        const input = getByPlaceholderText(/Title/i)
        const longTitle = "LongTitle01234567890LongTitle01234567890LongTitle01234567890"
        fireEvent.change(input, { target: { value: longTitle } })
        expect(input.value).toBe(longTitle.slice(0, 30))
    })
    test('It should create a new reminder object after filling the form', () => {
        const formProps = {
            defaultReminder: {
                title: "",
                time: new Date().getTime()
            }
        }
        const { getByPlaceholderText, getByLabelText } = render(<ReminderForm {...formProps} />)
        let inputTitle = getByPlaceholderText(/Title/i)
        let longTitle = "Walk the dog"
        fireEvent.change(inputTitle, { target: { value: longTitle } })
        expect(inputTitle.value).toBe(longTitle)
    
        let inputCity = getByPlaceholderText(/City/i)
        let title = "Lima"
        fireEvent.change(inputCity, { target: { value: title } })
        expect(inputCity.value).toBe(title)
    
        let inputDescription = getByPlaceholderText(/Description/i)
        let description = "Some description"
        fireEvent.change(inputDescription, { target: { value: description } })
        expect(inputDescription.value).toBe(description)
    })
})

