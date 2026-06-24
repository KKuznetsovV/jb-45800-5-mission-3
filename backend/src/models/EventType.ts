import { AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import AppEvent from './Event'

@Table({
    underscored: true,
    tableName: 'event_types'
})
export default class EventType extends Model {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.STRING)
    code: string

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @HasMany(() => AppEvent, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    events: AppEvent[]

}
