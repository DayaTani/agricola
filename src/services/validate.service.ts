import { InvalidRequestError, UniqueConstraintViolationError } from '../types/errors'
import z, { ZodError } from 'zod'
import Farmer from '../types/farmer'
import FarmerDto from '../types/farmer.dto'

/**
 * Validates a request body for creating or updating a farmer using a Zod schema.
 *
 * @param requestBody - The request body to be validated.
 * @param farmers - An array of Farmer objects representing the existing list of farmers.
 * @param farmerId - Optional. The ID of the farmer being updated. If provided,
 *                   it is used to exclude the farmer's current ID card number from the uniqueness check.
 * @returns Returns a valid FarmerDto if the request body is valid, otherwise throws an error.
 * @throws {InvalidRequestError} Throws an error if the request body is invalid.
 * @throws {UniqueConstraintViolationError} Throws an error if the ID card number is not unique.
 */
const validate = (requestBody: unknown, farmers: Farmer[], farmerId: number | null): FarmerDto => {
  /** Zod schema for validating a farmer creation request. */
  const farmerSchema = z.object({
    name: z.string().min(3),
    idCardNumber: z.string().refine(idCardNumber => /^\d+$/.test(idCardNumber)),
    birthDate: z.string().refine(date => /^\d{4}-\d{2}-\d{2}$/.test(date)),
  })

  /** The validated request body according to the Zod schema. */
  let zodValidRequestBody: FarmerDto

  try {
    zodValidRequestBody = farmerSchema.parse(requestBody)
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw new InvalidRequestError(error.message)
    }

    /* istanbul ignore next */
    throw error
  }

  semanticValidateBirthDate(zodValidRequestBody.birthDate)

  checkIdCardUniqueness(zodValidRequestBody.idCardNumber, farmers, farmerId)

  return zodValidRequestBody
}

/**
 * Validates a birthdate represented as a string to ensure it's a valid date and not in the future.
 *
 * @param rawBirthDate - The raw birthdate string in YYYY-MM-DD format.
 * @throws {InvalidRequestError} Throws an error if the birth date is invalid.
 */
const semanticValidateBirthDate = (rawBirthDate: string): void => {
  /** The birth date as a JavaScript Date object. */
  const birthDate = new Date(rawBirthDate)

  /** The current date, normalized to the start of the day. */
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (isNaN(birthDate.getTime()) || birthDate > today) {
    throw new InvalidRequestError('Invalid birth date.')
  }
}

/**
 * Checks if an ID card number is unique among a list of farmers, optionally excluding a given farmer by ID.
 * This exclusion is useful for update operations where the farmer's own ID card number
 * should not trigger a uniqueness violation.
 *
 * @param idCardNumber - The ID card number to check for uniqueness.
 * @param farmers - An array of Farmer objects representing the list of farmers.
 * @param farmerId - Optional. The ID of the farmer to exclude from the uniqueness check.
 *                   Use null for creation operations.
 * @throws {UniqueConstraintViolationError} Throws an error if the ID card number is not unique.
 */
const checkIdCardUniqueness = (idCardNumber: string, farmers: Farmer[], farmerId: number | null): void => {
  if (farmers.some(farmer => farmer.idCardNumber === idCardNumber && farmer.id !== farmerId)) {
    throw new UniqueConstraintViolationError('ID card number must be unique.')
  }
}

export default validate
