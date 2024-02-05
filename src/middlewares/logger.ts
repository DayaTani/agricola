import { NextFunction, Request, Response } from 'express'

/**
 * Middleware function to log incoming requests.
 *
 * @param req - The HTTP request object.
 * @param _res - The HTTP response object (not used).
 * @param next - The next function to call in the middleware chain.
 */
const logger = (req: Request, _res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.url}`)
  next()
}

export default logger
