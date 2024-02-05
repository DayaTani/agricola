/** Represents a DTO to create or replace Farmer entity. */
export default interface FarmerDto {
  /** The name of the farmer. */
  name: string

  /** The identification card number of the farmer. */
  idCardNumber: string

  /** The birthdate of the farmer in the format YYYY-MM-DD. */
  birthDate: string
}

