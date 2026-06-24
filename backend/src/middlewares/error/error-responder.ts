import type { NextFunction, Request, Response } from 'express'

export default function respondError(error: any, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500
    const message = error.message || 'internal server error'
    response.status(status).json({ error: message })
}
