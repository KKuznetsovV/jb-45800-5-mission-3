import { Router } from 'express'
import { getAllEventTypes } from '../controllers/event-types/controller'

const eventTypesRouter = Router()

eventTypesRouter.get('/', getAllEventTypes)

export default eventTypesRouter
