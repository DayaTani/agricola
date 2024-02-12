import { Request, Response } from 'express'
import { ResourceNotFoundError } from '../../types/errors'
import database from '../../database'
import deleteFarmer from '../../services/delete-farmer.service'

/**
 * Handles the HTTP request to delete a specific farmer.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const destroy = (request: Request, response: Response): void => {
  try {
    deleteFarmer(database.farmers, request.params.id)
  } catch (error: unknown) {
    if (error instanceof ResourceNotFoundError) {
      response.status(404).send()
      return
    }

    /* istanbul ignore next */
    throw error
  }

  response.status(200).send()
}

export default destroy
