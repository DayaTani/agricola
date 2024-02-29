import Farmer from '../types/farmer'
import { ResourceNotFoundError } from '../types/errors'
import { findFarmer } from './find-farmer.service'

/**
 * Function to get a Farmer by ID from an array of Farmers.
 *
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID as a string to search for.
 * @throws {ResourceNotFoundError} Throws an error if the farmer to be retrieved is not found.
 * @returns The found Farmer object.
 */
const getFarmer = (farmers: Farmer[], rawId: string): Farmer => {
  /** The index of the farmer in the array if found, otherwise null. */
  const farmerIndex = findFarmer(farmers, rawId)
  if (farmerIndex === null) {
    throw new ResourceNotFoundError(`Farmer with ID ${rawId} is not found.`)
  }

  return farmers[farmerIndex]
}

export default getFarmer
