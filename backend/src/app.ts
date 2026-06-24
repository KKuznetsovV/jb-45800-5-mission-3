import 'reflect-metadata'
import express, { json } from 'express'
import cors from 'cors'
import config from 'config'
import sequelize from './db/sequelize'
import eventTypesRouter from './routers/event-types'
import eventsRouter from './routers/events'
import notFound from './middlewares/not-found'
import logError from './middlewares/error/log-error'
import respondError from './middlewares/error/error-responder'

;(async () => {
    const port = config.get<number>('app.port')
    const name = config.get<string>('app.name')

    const app = express()

    // middlewares
    app.use('/', cors())
    app.use('/', json())

    // routes
    app.use('/event-types', eventTypesRouter)
    app.use('/events', eventsRouter)
    app.use('/', notFound)

    // error middlewares
    app.use('/', logError)
    app.use('/', respondError)

    const syncForce = !!config.get('app.sync.force')
    await sequelize.sync({ force: syncForce })

    app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
})()
