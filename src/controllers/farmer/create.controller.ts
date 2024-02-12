import { InvalidRequestError, UniqueConstraintViolationError } from '../../types/errors'
import { Request, Response } from 'express'
import { BackdoorError } from '../../types/errors'
import createFarmer from '../../services/create-farmer.service'
import database from '../../database'

/**
 * Handles the creation of a new farmer based on the request body.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const create = (request: Request, response: Response): void => {
  try {
    createFarmer(request.body, database.farmers, database.nextFarmerId)
  } catch (error: unknown) {
    if (error instanceof InvalidRequestError) {
      response.status(400).send()
      return
    }

    if (error instanceof UniqueConstraintViolationError) {
      response.status(409).send()
      return
    }

    if (error instanceof BackdoorError) {
      response.status(500).send()
      return
    }

    /* istanbul ignore next */
    throw error
  }

  ++database.nextFarmerId

  response.status(201).send()
}

export default create
