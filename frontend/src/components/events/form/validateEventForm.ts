import type EventDraft from '../../../models/EventDraft'

export default function validateEventForm(form: EventDraft): string | null {
    if (!form.eventTypeCode) return 'Please select an event type'
    if (!form.startDatetime) return 'Please select a date and time'
    if (new Date(form.startDatetime) <= new Date()) return 'Event date must be in the future'
    if (!form.description.trim()) return 'Description is required'
    if (form.description.trim().length < 2) return 'Description must be at least 2 characters'
    if (form.description.trim().length > 200) return 'Description must be at most 200 characters'
    if (!form.address.trim()) return 'Address is required'
    if (form.address.trim().length < 2) return 'Address must be at least 2 characters'
    if (form.address.trim().length > 200) return 'Address must be at most 200 characters'
    const attendees = Number(form.confirmedAttendees)
    if (form.confirmedAttendees === '' || isNaN(attendees)) return 'Confirmed attendees must be a number'
    if (!Number.isInteger(attendees)) return 'Confirmed attendees must be a whole number'
    if (attendees < 0 || attendees > 1000) return 'Confirmed attendees must be between 0 and 1000'
    return null
}
