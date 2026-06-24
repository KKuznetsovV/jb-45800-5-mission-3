import type { NextFunction, Request, Response } from 'express'
import type { ObjectSchema } from 'joi'

export default function bodyValidation(schema: ObjectSchema) {
    return function (request: Request, response: Response, next: NextFunction) {
        const { error } = schema.validate(request.body)
        if (error) return next({ status: 400, message: error.message })
        next()
    }
}
