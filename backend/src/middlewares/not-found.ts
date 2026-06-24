import type { NextFunction, Request, Response } from 'express'

export default function notFound(request: Request, response: Response, next: NextFunction) {
    next({
        status: 404,
        message: `route ${request.method} ${request.url} not found`
    })
}
