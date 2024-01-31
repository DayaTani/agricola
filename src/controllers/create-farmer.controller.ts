import CreateFarmerResult from '../types/create-farmer-result'
import Farmer from '../types/farmer'
import validate from '../validate'

/**
 * Creates a new farmer based on the provided request body and adds it to the list of farmers.
 *
 * @param requestBody - The request body containing farmer information.
 * @param farmers - An array of existing farmers.
 * @param nextFarmerId - The ID to be assigned to the new farmer.
 * @returns Returns a result object indicating the outcome of the operation.
 */
const createFarmer = (requestBody: unknown, farmers: Farmer[], nextFarmerId: number): CreateFarmerResult => {
  /** The farmer data obtained from the request body after validation. */
  const farmerDto = validate(requestBody, farmers)
  if (farmerDto === false) {
    return { success: false }
  }

  /** Represents the new farmer object to be created and added to the list of farmers. */
  const newFarmer: Farmer = {
    ...farmerDto,
    id: nextFarmerId,
  }

  /** Add the new farmer to the list of existing farmers. */
  farmers.push(newFarmer)

  /** Represents the result of the create operation, indicating success and the next farmer ID. */
  return {
    success: true,
    nextFarmerId: nextFarmerId + 1,
  }
}

export default createFarmer
