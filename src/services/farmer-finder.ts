import Farmer from '../types/farmer'

/**
 * Finds the index of a farmer in an array based on their ID.
 *
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID as a string to search for.
 * @returns The index of the found farmer in the array, or null if not found.
 */
export const findFarmer = (farmers: Farmer[], rawId: string): number | null => {
  /** Parsed integer ID. */
  const id = parseInt(rawId)
  if (isNaN(id) || id <= 0) {
    return null
  }

  /** Index of the found farmer in the array, or -1 if not found. */
  const foundIndex = farmers.findIndex(farmer => farmer.id === id)

  return foundIndex >= 0 ? foundIndex : null
}
