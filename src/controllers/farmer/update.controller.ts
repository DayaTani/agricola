import { InvalidRequestError, ResourceNotFoundError, UniqueConstraintViolationError } from '../../types/errors'
import { Request, Response } from 'express'
import database from '../../database'
import updateFarmer from '../../services/update-farmer.service'

/**
 * Handles the HTTP request to update information about a specific farmer.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const update = (request: Request, response: Response): void => {
  try {
    updateFarmer(request.body, database.farmers, request.params.id)
  } catch (error: unknown) {
    if (error instanceof ResourceNotFoundError) {
      response.status(404).send()
      return
    }

    if (error instanceof InvalidRequestError) {
      response.status(400).send()
      return
    }

    if (error instanceof UniqueConstraintViolationError) {
      response.status(409).send()
      return
    }
  }

  response.status(200).send()
}

export default update
