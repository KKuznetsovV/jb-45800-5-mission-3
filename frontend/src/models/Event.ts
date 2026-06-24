import type EventType from './EventType'

export default interface Event {
    code: string
    eventTypeCode: string
    startDatetime: string
    description: string
    address: string
    confirmedAttendees: number
    eventType?: EventType
}
