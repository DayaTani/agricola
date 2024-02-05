import Farmer from './farmer'

/** Represent the database of farmers that the application manages. */
export default interface Database {
  /** List of all farmers managed by the application. */
  farmers: Farmer[]

  /** The ID to be assigned to the next created Farmer. */
  nextFarmerId: number
}
