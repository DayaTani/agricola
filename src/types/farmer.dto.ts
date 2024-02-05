import Farmer from './farmer'

/** Represents a DTO to create/replace Farmer entity. */
type FarmerDto = Omit<Farmer, 'id'>

export default FarmerDto
