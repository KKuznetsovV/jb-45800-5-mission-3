import Joi from 'joi'

export const createEventValidator = Joi.object({
    eventTypeCode: Joi.string().required(),
    startDatetime: Joi.string().isoDate().required(),
    description: Joi.string().min(2).max(200).required(),
    address: Joi.string().min(2).max(200).required(),
    confirmedAttendees: Joi.number().integer().min(0).max(1000).required()
})

export const updateEventValidator = createEventValidator

export const eventCodeValidator = Joi.object({
    code: Joi.string().uuid().required()
})

export const eventTypeCodeValidator = Joi.object({
    typeCode: Joi.string().required()
})
