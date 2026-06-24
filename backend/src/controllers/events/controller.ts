import type { NextFunction, Request, Response } from 'express'
import AppEvent from '../../models/Event'
import EventType from '../../models/EventType'

export async function getAllEvents(request: Request, response: Response, next: NextFunction) {
    try {
        const events = await AppEvent.findAll({ include: [EventType] })
        response.json(events)
    } catch (e) {
        next(e)
    }
}

export async function getEventsByType(request: Request<{}, {}, {}, { typeCode: string }>, response: Response, next: NextFunction) {
    try {
        const { typeCode } = request.query

        const events = await AppEvent.findAll({
            where: { eventTypeCode: typeCode },
            include: [EventType]
        })

        response.json(events)
    } catch (e) {
        next(e)
    }
}

export async function getEventByCode(request: Request<{ code: string }>, response: Response, next: NextFunction) {
    try {
        const { code } = request.params

        const event = await AppEvent.findByPk(code, { include: [EventType] })

        if (!event) return next({
            status: 404,
            message: 'event does not exist'
        })

        response.json(event)
    } catch (e) {
        next(e)
    }
}

export async function createEvent(request: Request<{}, {}, { eventTypeCode: string, startDatetime: string, description: string, address: string, confirmedAttendees: number }>, response: Response, next: NextFunction) {
    try {
        const newEvent = await AppEvent.create({ ...request.body })
        await newEvent.reload({ include: [EventType] })
        response.json(newEvent)
    } catch (e) {
        next(e)
    }
}

export async function updateEvent(request: Request<{ code: string }, {}, { eventTypeCode: string, startDatetime: string, description: string, address: string, confirmedAttendees: number }>, response: Response, next: NextFunction) {
    try {
        const { code } = request.params

        const event = await AppEvent.findByPk(code)

        if (!event) return next({
            status: 404,
            message: 'event does not exist'
        })

        event.eventTypeCode = request.body.eventTypeCode
        event.startDatetime = new Date(request.body.startDatetime)
        event.description = request.body.description
        event.address = request.body.address
        event.confirmedAttendees = request.body.confirmedAttendees
        await event.save()
        await event.reload({ include: [EventType] })

        response.json(event)
    } catch (e) {
        next(e)
    }
}

export async function deleteEvent(request: Request<{ code: string }>, response: Response, next: NextFunction) {
    try {
        const { code } = request.params

        const numberOfRowsDeleted = await AppEvent.destroy({ where: { code } })

        if (numberOfRowsDeleted === 0) return next({
            status: 404,
            message: 'event does not exist'
        })

        response.json({ success: true })
    } catch (e) {
        next(e)
    }
}
