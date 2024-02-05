import Farmer from '../types/farmer'
import FarmerDto from '../types/farmer.dto'
import z from 'zod'

/**
 * Validates a request body for creating or updating a farmer using a Zod schema.
 *
 * @param requestBody - The request body to be validated.
 * @param farmers - An array of Farmer objects representing the existing list of farmers.
 * @param farmerId - Optional. The ID of the farmer being updated. If provided,
 *                   it is used to exclude the farmer's current ID card number from the uniqueness check.
 * @returns Returns a valid FarmerDto if the request body is valid, otherwise returns false.
 */
const validate = (requestBody: unknown, farmers: Farmer[], farmerId: number | null): FarmerDto | false => {
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

  /** Represents the validated request body as a FarmerDto object. */
  const zodValidRequestBody = result.data as FarmerDto
  if (!semanticValidateBirthDate(zodValidRequestBody.birthDate)) {
    return false
  }

  if (!isIdCardUnique(zodValidRequestBody.idCardNumber, farmers, farmerId)) {
    return false
  }

  return zodValidRequestBody
}

/**
 * Validates a birthdate represented as a string to ensure it's a valid date and not in the future.
 *
 * @param rawBirthDate - The raw birthdate string in YYYY-MM-DD format.
 * @returns Returns true if the birthdate is valid, false otherwise.
 */
const semanticValidateBirthDate = (rawBirthDate: string): boolean => {
  /** The birth date as a JavaScript Date object. */
  const birthDate = new Date(rawBirthDate)

  /** The current date, normalized to the start of the day. */
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return !isNaN(birthDate.getTime()) && birthDate <= today
}

/**
 * Checks if an ID card number is unique among a list of farmers, optionally excluding a given farmer by ID.
 * This exclusion is useful for update operations where the farmer's own ID card number
 *  should not trigger a uniqueness violation.
 *
 * @param idCardNumber - The ID card number to check for uniqueness.
 * @param farmers - An array of Farmer objects representing the list of farmers.
 * @param farmerId - Optional. The ID of the farmer to exclude from the uniqueness check.
 *                   Use null for creation operations.
 * @returns Returns true if the ID card number is unique among the farmers (excluding the optional farmerId),
 *          false otherwise.
 */
const isIdCardUnique = (idCardNumber: string, farmers: Farmer[], farmerId: number | null): boolean => {
  return !farmers.some(farmer => farmer.idCardNumber === idCardNumber && farmer.id !== farmerId)
}

export default validate
