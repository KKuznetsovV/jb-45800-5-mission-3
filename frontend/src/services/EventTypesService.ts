import axios from 'axios'
import type EventType from '../models/EventType'

class EventTypesService {

    async getAll(): Promise<EventType[]> {
        const { data } = await axios.get<EventType[]>(`${import.meta.env.VITE_REST_SERVER_URL}/event-types`)
        return data
    }

}

const eventTypesService = new EventTypesService()
export default eventTypesService
