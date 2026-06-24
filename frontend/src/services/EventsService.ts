import axios from 'axios'
import type Event from '../models/Event'
import type EventDraft from '../models/EventDraft'

class EventsService {

    async getByType(typeCode: string): Promise<Event[]> {
        const { data } = await axios.get<Event[]>(`${import.meta.env.VITE_REST_SERVER_URL}/events`, {
            params: { typeCode }
        })
        return data
    }

    async getByCode(code: string): Promise<Event> {
        const { data } = await axios.get<Event>(`${import.meta.env.VITE_REST_SERVER_URL}/events/${code}`)
        return data
    }

    async create(draft: EventDraft): Promise<Event> {
        const { data } = await axios.post<Event>(`${import.meta.env.VITE_REST_SERVER_URL}/events`, draft)
        return data
    }

    async update(code: string, draft: EventDraft): Promise<Event> {
        const { data } = await axios.put<Event>(`${import.meta.env.VITE_REST_SERVER_URL}/events/${code}`, draft)
        return data
    }

    async delete(code: string): Promise<void> {
        await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/events/${code}`)
    }

}

const eventsService = new EventsService()
export default eventsService
