import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DateTimePicker from './DateTimePicker'
import validateEventForm from './validateEventForm'
import type EventType from '../../../models/EventType'
import type EventDraft from '../../../models/EventDraft'
import eventTypesService from '../../../services/EventTypesService'
import eventsService from '../../../services/EventsService'
import './EventForm.css'

export default function AddEvent() {
    const [eventTypes, setEventTypes] = useState<EventType[]>([])
    const [form, setForm] = useState<EventDraft>({
        eventTypeCode: '',
        startDatetime: '',
        description: '',
        address: '',
        confirmedAttendees: 0
    })
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        eventTypesService.getAll()
            .then(setEventTypes)
            .catch(() => toast.error('Failed to load event types'))
    }, [])

    function validate(): string | null {
        return validateEventForm(form)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const error = validate()
        if (error) return toast.error(error)
        setSubmitting(true)
        try {
            await eventsService.create({ ...form, confirmedAttendees: Number(form.confirmedAttendees) })
            toast.success('Event created successfully')
            navigate('/events')
        } catch (err: any) {
            const msg = err?.response?.data?.error || 'Failed to create event'
            toast.error(msg)
        } finally {
            setSubmitting(false)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="event-form-page">
            <h2>Add New Event</h2>
            <form className="event-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Type</label>
                    <select name="eventTypeCode" value={form.eventTypeCode} onChange={handleChange} required>
                        <option value="">-- Select a type --</option>
                        {eventTypes.map(et => (
                            <option key={et.code} value={et.code}>{et.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date & Time</label>
                    <DateTimePicker
                        value={form.startDatetime}
                        onChange={v => setForm(prev => ({ ...prev, startDatetime: v }))}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required rows={3} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Confirmed Attendees (0–1000)</label>
                    <input type="number" name="confirmedAttendees" value={form.confirmedAttendees} onChange={handleChange} min={0} max={1000} required />
                </div>
                <button type="submit" className="btn-submit" disabled={submitting}>
                    {submitting ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    )
}
