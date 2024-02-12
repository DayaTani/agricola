import Farmer from '../types/farmer'
import { ResourceNotFoundError } from '../types/errors'
import { findFarmer } from './find-farmer.service'

/**
 * Deletes a farmer from the array based on their ID.
 *
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID as a string of the farmer to be deleted.
 * @throws {ResourceNotFoundError} Throws an error if the farmer to be deleted is not found.
 */
const deleteFarmer = (farmers: Farmer[], rawId: string): void => {
  const farmerIndex = findFarmer(farmers, rawId)
  if (farmerIndex === null) {
    throw new ResourceNotFoundError(`Farmer with ID ${rawId} is not found.`)
  }

  farmers.splice(farmerIndex, 1)
}

export default deleteFarmer
