import CreateFarmerDto from './types/create-farmer.dto'
import z from 'zod'

/**
 * Validates a request body for creating a farmer using a Zod schema.
 *
 * @param requestBody - The request body to be validated.
 * @returns Returns a valid CreateFarmerDto if the request body is valid, otherwise returns false.
 */
const validate = (requestBody: unknown): CreateFarmerDto | false => {
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

  console.error('through here')

  /** The birthdate as a JavaScript Date object. */
  const birthdate = new Date(zodValidRequestBody.birthDate)
  if (isNaN(birthdate.getTime())) {
    return false
  }

  return zodValidRequestBody
}

export default validate
