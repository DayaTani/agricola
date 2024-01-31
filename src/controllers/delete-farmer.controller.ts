import Farmer from '../types/farmer'

/**
 * Deletes a farmer from the array based on their ID.
 *
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID as a string of the farmer to be deleted.
 * @returns True if the farmer is successfully deleted, false otherwise.
 */
const deleteFarmer = (farmers: Farmer[], rawId: string): boolean => {
  /** Parsed integer ID. */
  const id = parseInt(rawId)
  if (isNaN(id) || id <= 0) {
    return false
  }

  /** Index of the found farmer to be deleted, or null if not found. */
  let foundIndex: number | null = null

  for (let i = 0; i < farmers.length; i++) {
    if (farmers[i].id === id) {
      foundIndex = i
      break
    }
  }

  if (foundIndex === null) {
    return false
  }

  farmers.splice(foundIndex, 1)

  return true
}

export default deleteFarmer
