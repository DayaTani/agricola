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

  /** Index of the found farmer in the array, or null if not found. */
  let foundIndex: number | null = null

  for (let i = 0; i < farmers.length; i++) {
    if (farmers[i].id === id) {
      foundIndex = i
      break
    }
  }

  return foundIndex
}
