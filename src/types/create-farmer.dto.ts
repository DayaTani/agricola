import Farmer from './farmer'

/** Represents a DTO to create/replace Farmer entity. */
type CreateFarmerDto = Omit<Farmer, 'id'>

export default CreateFarmerDto
