import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type EventType from '../../../models/EventType'
import type Event from '../../../models/Event'
import eventTypesService from '../../../services/EventTypesService'
import eventsService from '../../../services/EventsService'
import './EventsList.css'

function getDaysUntil(dateStr: string): number {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const eventDate = new Date(dateStr)
    eventDate.setHours(0, 0, 0, 0)
    return Math.round((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function isPast(dateStr: string): boolean {
    return getDaysUntil(dateStr) < 0
}

export default function EventsList() {
    const [eventTypes, setEventTypes] = useState<EventType[]>([])
    const [selectedType, setSelectedType] = useState<string>('')
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        eventTypesService.getAll()
            .then(setEventTypes)
            .catch(() => toast.error('Failed to load event types'))
    }, [])

    useEffect(() => {
        if (!selectedType) return
        setLoading(true)
        eventsService.getByType(selectedType)
            .then(setEvents)
            .catch(() => toast.error('Failed to load events'))
            .finally(() => setLoading(false))
    }, [selectedType])

    async function handleDelete(code: string) {
        if (!confirm('Are you sure you want to delete this event?')) return
        try {
            await eventsService.delete(code)
            setEvents(prev => prev.filter(e => e.code !== code))
            toast.success('Event deleted')
        } catch {
            toast.error('Failed to delete event')
        }
    }

    return (
        <div className="events-list">
            <h2>Events</h2>
            <div className="type-select-row">
                <label htmlFor="type-select">Filter by event type:</label>
                <select
                    id="type-select"
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                >
                    <option value="">-- Select a type --</option>
                    {eventTypes.map(et => (
                        <option key={et.code} value={et.code}>{et.name}</option>
                    ))}
                </select>
            </div>

            {loading && <p className="loading">Loading...</p>}

            {!loading && selectedType && events.length === 0 && (
                <p className="no-events">No events found for this type.</p>
            )}

            {events.length > 0 && (
                <table className="events-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Date & Time</th>
                            <th>Attendees</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => {
                            const past = isPast(event.startDatetime)
                            const daysUntil = getDaysUntil(event.startDatetime)
                            return (
                                <tr key={event.code} className={past ? 'row-past' : 'row-future'}>
                                    <td>{event.description}</td>
                                    <td>{event.address}</td>
                                    <td>{new Date(event.startDatetime).toLocaleString()}</td>
                                    <td>{event.confirmedAttendees}</td>
                                    <td>
                                        {past
                                            ? <span className="badge past">Passed</span>
                                            : <span className="badge future">{daysUntil === 0 ? 'Today' : `In ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`}</span>
                                        }
                                    </td>
                                    <td className="actions-cell">
                                        <button className="btn-edit" onClick={() => navigate(`/events/update/${event.code}`)}>Edit</button>
                                        <button className="btn-delete" onClick={() => handleDelete(event.code)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
