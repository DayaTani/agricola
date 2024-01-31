import CreateFarmerDto from './types/create-farmer.dto'
import Farmer from './types/farmer'
import z from 'zod'

/**
 * Validates a request body for creating a farmer using a Zod schema.
 *
 * @param requestBody - The request body to be validated.
 * @param farmers - An array of Farmer objects representing the existing list of farmers.
 * @returns Returns a valid CreateFarmerDto if the request body is valid, otherwise returns false.
 */
const validate = (requestBody: unknown, farmers: Farmer[]): CreateFarmerDto | false => {
  /** Zod schema for validating a farmer creation request. */
  const farmerSchema = z.object({
    name: z.string().min(3),
    idCardNumber: z.string().refine(idCardNumber => /^\d+$/.test(idCardNumber)),
    birthDate: z.string().refine(date => /^\d{4}-\d{2}-\d{2}$/.test(date)),
  })

  /** Result of parsing and validating the request body against the `farmerSchema`. */
  const result = farmerSchema.safeParse(requestBody)
  if (result.success === false) {
    return false
  }

  /** Represents the validated request body as a CreateFarmerDto object */
  const zodValidRequestBody = result.data as CreateFarmerDto
  if (!semanticValidateBirthDate(zodValidRequestBody.birthDate)) {
    return false
  }

  if (!isIdCardUnique(zodValidRequestBody.idCardNumber, farmers)) {
    return false
  }

  return zodValidRequestBody
}

/**
 * Validates a birthdate represented as a string to ensure it's a valid date.
 * @param rawBirthDate - The raw birthdate string in YYYY-MM-DD format.
 * @returns - Returns true if the birthdate is valid, false otherwise.
 */
const semanticValidateBirthDate = (rawBirthDate: string): boolean => {
  /** The birth date as a JavaScript Date object. */
  const birthDate = new Date(rawBirthDate)

  return !isNaN(birthDate.getTime())
}

/**
 * Checks if an ID card number is unique among a list of farmers.
 * @param idCardNumber - The ID card number to check for uniqueness.
 * @param farmers - An array of Farmer objects representing the list of farmers.
 * @returns - Returns true if the ID card number is unique among the farmers, false otherwise.
 */
const isIdCardUnique = (idCardNumber: string, farmers: Farmer[]): boolean => {
  for (const farmer of farmers) {
    if (idCardNumber === farmer.idCardNumber) {
      return false
    }
  }

  return true
}

export default validate
