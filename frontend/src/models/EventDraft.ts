export default interface EventDraft {
    eventTypeCode: string
    startDatetime: string
    description: string
    address: string
    confirmedAttendees: number | string
}
