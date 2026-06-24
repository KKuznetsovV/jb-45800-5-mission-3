import { Router } from 'express'
import { getAllEvents, getEventsByType, getEventByCode, createEvent, updateEvent, deleteEvent } from '../controllers/events/controller'
import { createEventValidator, updateEventValidator, eventCodeValidator, eventTypeCodeValidator } from '../controllers/events/validator'
import bodyValidation from '../middlewares/body-validation'
import paramsValidation from '../middlewares/params-validation'
import queryValidation from '../middlewares/query-validation'

const eventsRouter = Router()

eventsRouter.get('/', queryValidation(eventTypeCodeValidator), getEventsByType)
eventsRouter.get('/all', getAllEvents)
eventsRouter.get('/:code', paramsValidation(eventCodeValidator), getEventByCode)
eventsRouter.post('/', bodyValidation(createEventValidator), createEvent)
eventsRouter.put('/:code', paramsValidation(eventCodeValidator), bodyValidation(updateEventValidator), updateEvent)
eventsRouter.delete('/:code', paramsValidation(eventCodeValidator), deleteEvent)

export default eventsRouter
