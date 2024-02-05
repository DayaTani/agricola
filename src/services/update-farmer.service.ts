import Farmer from '../types/farmer'
import FarmerDto from '../types/farmer.dto'
import UpdateFarmerResult from '../types/update-farmer-result'
import getFarmer from './get-farmer.service'
import validate from './validate.service'

/**
 * Updates a farmer's information based on the provided request body.
 *
 * @param requestBody - The request body containing updated farmer information.
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID used to identify the farmer to update.
 * @returns The result of the update operation.
 */
const updateFarmer = (requestBody: unknown, farmers: Farmer[], rawId: string): UpdateFarmerResult => {
  /** The farmer object to be updated. */
  const farmer: Farmer | null = getFarmer(farmers, rawId)
  if (farmer === null) {
    return UpdateFarmerResult.NotFound
  }

  /** The validated farmer data from the request body. */
  const farmerDto: FarmerDto | false = validate(requestBody, farmers)
  if (farmerDto === false) {
    return UpdateFarmerResult.Invalid
  }

  /** The original name of the farmer before any updates are applied. */
  const originalName = farmer.name

  farmer.name = farmerDto.name
  farmer.idCardNumber = farmerDto.idCardNumber
  farmer.birthDate = farmerDto.birthDate

  if (originalName !== farmer.name) {
    farmers.sort((a, b) => (a.name < b.name ? -1 : 1))
  }

  return UpdateFarmerResult.Success
}

export default updateFarmer
