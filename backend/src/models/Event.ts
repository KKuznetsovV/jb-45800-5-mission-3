import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import EventType from './EventType'

@Table({
    underscored: true,
    tableName: 'events'
})
export default class AppEvent extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    code: string

    @ForeignKey(() => EventType)
    @AllowNull(false)
    @Column(DataType.STRING)
    eventTypeCode: string

    @AllowNull(false)
    @Column(DataType.DATE)
    startDatetime: Date

    @AllowNull(false)
    @Column(DataType.STRING)
    description: string

    @AllowNull(false)
    @Column(DataType.STRING)
    address: string

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    confirmedAttendees: number

    @BelongsTo(() => EventType)
    eventType: EventType

}
