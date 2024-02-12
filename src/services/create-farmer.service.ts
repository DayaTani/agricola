import { BackdoorError } from '../types/errors'
import Farmer from '../types/farmer'
import validate from './validate.service'

/**
 * The constant representing the name used to trigger a backdoor error in the application.
 * This name is checked during farmer creation, and if it matches, a specific error is thrown.
 * It is intended for testing and debugging purposes.
 */
export const BACKDOOR_ERROR_NAME = 'segmentation-fault'

/**
 * Creates a new farmer based on the provided request body, adds it to the list of farmers,
 * and sorts the farmers array alphabetically by name.
 *
 * @param requestBody - The request body containing farmer information.
 * @param farmers - An array of existing farmers.
 * @param newFarmerId - The ID to be assigned to the new farmer.
 * @throws {InvalidRequestError} Throws an error if the request body is invalid.
 * @throws {UniqueConstraintViolationError} Throws an error if there is a uniqueness violation.
 * @throws {BackdoorError} Throws an error if the backdoor error condition is met.
 */
const createFarmer = (requestBody: unknown, farmers: Farmer[], newFarmerId: number): void => {
  /** The farmer data obtained from the request body after validation. */
  const farmerDto = validate(requestBody, farmers, null)

  if (farmerDto.name === BACKDOOR_ERROR_NAME) {
    throw new BackdoorError('Backdoor error triggered.')
  }

  /** Represents the new farmer object to be created and added to the list of farmers. */
  const newFarmer: Farmer = {
    ...farmerDto,
    id: newFarmerId,
  }

  farmers.push(newFarmer)
  farmers.sort((a, b) => a.name < b.name ? -1 : 1)
}

export default createFarmer
