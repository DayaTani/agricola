import Farmer from '../types/farmer'
import { findFarmer } from './find-farmer.service'

/**
 * Deletes a farmer from the array based on their ID.
 *
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID as a string of the farmer to be deleted.
 * @returns True if the farmer is successfully deleted, false otherwise.
 */
const deleteFarmer = (farmers: Farmer[], rawId: string): boolean => {
  const farmerIndex = findFarmer(farmers, rawId)
  if (farmerIndex === null) {
    return false
  }

  farmers.splice(farmerIndex, 1)

  return true
}

export default deleteFarmer
