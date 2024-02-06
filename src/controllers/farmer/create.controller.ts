import { Request, Response } from 'express'
import BackdoorError from '../../types/backdoor-error'
import CreateFarmerResult from '../../types/create-farmer-result'
import createFarmer from '../../services/create-farmer.service'
import database from '../../database'

/**
 * Handles the creation of a new farmer based on the request body.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const create = (request: Request, response: Response): void => {
  /** Result of attempting to create a new farmer. */
  let result: CreateFarmerResult

  try {
    result = createFarmer(request.body, database.farmers, database.nextFarmerId)
  } catch (error: unknown) {
    if (error instanceof BackdoorError) {
      response.status(500).send()
      return
    }

    /* istanbul ignore next */
    throw error
  }
  if (result.success === false) {
    response.status(400).send()
    return
  }

  database.nextFarmerId = result.nextFarmerId

  response.status(201).send()
}

export default create
