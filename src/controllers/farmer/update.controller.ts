import { Request, Response } from 'express'
import UpdateFarmerResult from '../../types/update-farmer-result'
import database from '../../database'
import updateFarmer from '../../services/update-farmer.service'

/**
 * Handles the HTTP request to update information about a specific farmer.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const update = (request: Request, response: Response): void => {
  /** The result of attempting to update a specific farmer. */
  const result = updateFarmer(request.body, database.farmers, request.params.id)

  if (result === UpdateFarmerResult.NotFound) {
    response.status(404).send()
    return
  }

  if (result === UpdateFarmerResult.Invalid) {
    response.status(400).send()
    return
  }

  response.status(200).send()
}

export default update
