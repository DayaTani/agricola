import Farmer from '../types/farmer'

/**
 * Function to get a Farmer by ID from an array of Farmers.
 *
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID as a string to search for.
 * @returns The found Farmer object or null if not found.
 */
const getFarmer = (farmers: Farmer[], rawId: string): Farmer | null => {
  /** Parsed integer ID. */
  const id = parseInt(rawId)
  if (isNaN(id) || id <= 0) {
    return null
  }

  /** Farmer object matching the provided ID. */
  let foundFarmer: Farmer | null = null

  for (const farmer of farmers) {
    if (farmer.id === id) {
      foundFarmer = farmer
      break
    }
  }

  return foundFarmer
}

export default getFarmer
