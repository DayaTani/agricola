/** Represents the result of an operation to create a farmer. */
type CreateFarmerResult = {
  /** Indicates whether the creation was successful. */
  success: true
  /** The ID of the next created farmer, applicable if `success` is `true`. */
  nextFarmerId: number
} | {
  /** Indicates whether the creation was successful. */
  success: false
}

export default CreateFarmerResult
