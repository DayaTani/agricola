import BackdoorError from '../types/backdoor-error'
import CreateFarmerResult from '../types/create-farmer-result'
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
 * @param nextFarmerId - The ID to be assigned to the new farmer.
 * @throws {BackdoorError} Throws an error if the backdoor error condition is met.
 * @returns Returns a result object indicating the outcome of the operation.
 */
const createFarmer = (requestBody: unknown, farmers: Farmer[], nextFarmerId: number): CreateFarmerResult => {
  /** The farmer data obtained from the request body after validation. */
  const farmerDto = validate(requestBody, farmers, null)
  if (farmerDto === false) {
    return { success: false }
  }

  if (farmerDto.name === BACKDOOR_ERROR_NAME) {
    throw new BackdoorError('Backdoor error triggerred.')
  }

  /** Represents the new farmer object to be created and added to the list of farmers. */
  const newFarmer: Farmer = {
    ...farmerDto,
    id: nextFarmerId,
  }

  farmers.push(newFarmer)
  farmers.sort((a, b) => a.name < b.name ? -1 : 1)

  /** Represents the result of the create operation, indicating success and the next farmer ID. */
  return {
    success: true,
    nextFarmerId: nextFarmerId + 1,
  }
}

export default createFarmer
