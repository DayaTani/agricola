import { Request, Response } from 'express'
import database from '../../database'
import getFarmer from '../../services/get-farmer.service'

/**
 * Handles the HTTP request to retrieve information about a specific farmer.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const show = (request: Request, response: Response): void => {
  /** The farmer object containing information about a specific farmer if found, or null if not found. */
  const farmer = getFarmer(database.farmers, request.params.id)
  if (farmer === null) {
    response.status(404).send()
    return
  }

  response.json(farmer)
}

export default show
