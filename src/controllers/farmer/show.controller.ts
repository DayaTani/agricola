import { Request, Response } from 'express'
import Farmer from '../../types/farmer'
import { ResourceNotFoundError } from '../../types/errors'
import database from '../../database'
import getFarmer from '../../services/get-farmer.service'

/**
 * Handles the HTTP request to retrieve information about a specific farmer.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const show = (request: Request, response: Response): void => {
  /** The Farmer object containing information about a specific farmer. */
  let farmer: Farmer

  try {
    farmer = getFarmer(database.farmers, request.params.id)
  } catch (error: unknown) {
    if (error instanceof ResourceNotFoundError) {
      response.status(404).send()
      return
    }

    /* istanbul ignore next */
    throw error
  }

  response.json(farmer)
}

export default show
