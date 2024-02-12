import Farmer from '../types/farmer'
import getFarmer from './get-farmer.service'
import validate from './validate.service'

/**
 * Updates a farmer's information based on the provided request body.
 *
 * @param requestBody - The request body containing updated farmer information.
 * @param farmers - An array of Farmer objects.
 * @param rawId - The raw ID used to identify the farmer to update.
 * @throws {ResourceNotFoundError} Throws an error if the farmer to update is not found.
 * @throws {InvalidRequestError} Throws an error if the request body is invalid.
 * @throws {UniqueConstraintViolationError} Throws an error if there is a uniqueness violation.
 */
const updateFarmer = (requestBody: unknown, farmers: Farmer[], rawId: string): void => {
  /** The farmer object to be updated. */
  const farmer = getFarmer(farmers, rawId)

  /** The validated farmer data from the request body. */
  const farmerDto = validate(requestBody, farmers, farmer.id)

  /** The original name of the farmer before any updates are applied. */
  const originalName = farmer.name

  farmer.name = farmerDto.name
  farmer.idCardNumber = farmerDto.idCardNumber
  farmer.birthDate = farmerDto.birthDate

  if (originalName !== farmer.name) {
    farmers.sort((a, b) => (a.name < b.name ? -1 : 1))
  }
}

export default updateFarmer
