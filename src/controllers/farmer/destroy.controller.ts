import { Request, Response } from 'express'
import database from '../../database'
import deleteFarmer from '../../services/delete-farmer.service'

/**
 * Handles the HTTP request to delete a specific farmer.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const destroy = (request: Request, response: Response): void => {
  /** Indicates whether the deletion of the farmer was successful or not. */
  const deleted = deleteFarmer(database.farmers, request.params.id)

  if (deleted === false) {
    response.status(404).send()
    return
  }

  response.status(200).send()
}

export default destroy
