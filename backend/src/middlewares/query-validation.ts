import type { NextFunction, Request, Response } from 'express'
import type { ObjectSchema } from 'joi'

export default function queryValidation(schema: ObjectSchema) {
    return function (request: Request, response: Response, next: NextFunction) {
        const { error } = schema.validate(request.query)
        if (error) return next({ status: 400, message: error.message })
        next()
    }
}
