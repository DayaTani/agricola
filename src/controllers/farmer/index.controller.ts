import { Request, Response } from 'express'
import database from '../../database'
import listFarmers from '../../services/list-farmers.service'

/**
 * Handles the HTTP request to list farmers based on specified parameters.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const index = (request: Request, response: Response): void => {
  /** An array of farmers matching the provided criteria. */
  const farmers = listFarmers(database.farmers, request.query)

  response.json({ farmers })
}

export default index
