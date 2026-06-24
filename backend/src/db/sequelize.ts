import { Sequelize } from 'sequelize-typescript'
import config from 'config'
import EventType from '../models/EventType'
import AppEvent from '../models/Event'

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [EventType, AppEvent],
    logging: console.log,
    ...config.get('db')
})

console.log(`connected to database on `, config.get('db'))

export default sequelize
