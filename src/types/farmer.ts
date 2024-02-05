import FarmerDto from './farmer.dto'

/** Represents a Farmer entity. */
export default interface Farmer extends FarmerDto {
  /** The unique identifier for the farmer. */
  id: number
}
