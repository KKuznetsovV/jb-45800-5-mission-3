import type { NextFunction, Request, Response } from 'express'

export default function logError(error: any, request: Request, response: Response, next: NextFunction) {
    console.error(error)
    next(error)
}
