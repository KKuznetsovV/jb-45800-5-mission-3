import type { NextFunction, Request, Response } from 'express'
import EventType from '../../models/EventType'

export async function getAllEventTypes(request: Request, response: Response, next: NextFunction) {
    try {
        const eventTypes = await EventType.findAll()
        response.json(eventTypes)
    } catch (e) {
        next(e)
    }
}
