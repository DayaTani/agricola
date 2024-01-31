/** Represents a Farmer with essential information. */
export default interface Farmer {
  /** The unique identifier for the farmer. */
  id: number

  /** The name of the farmer. */
  name: string

  /** The identification card number of the farmer. */
  idCardNumber: string

  /** The birthdate of the farmer in the format YYYY-MM-DD. */
  birthDate: string
}
