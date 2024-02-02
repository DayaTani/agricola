import Farmer from '../types/farmer'
import { findFarmer } from './find-farmer.service'

/**
 * Function to get a Farmer by ID from an array of Farmers.
 *
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID as a string to search for.
 * @returns The found Farmer object or null if not found.
 */
const getFarmer = (farmers: Farmer[], rawId: string): Farmer | null => {
  const farmerIndex = findFarmer(farmers, rawId)
  if (farmerIndex === null) {
    return null
  }

  return farmers[farmerIndex]
}

export default getFarmer
