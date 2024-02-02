/** Enum representing the result of updating a farmer. */
enum UpdateFarmerResult {
  /** Update operation was successful. */
  Success = 0,

  /** The farmer was not found. */
  NotFound = 1,

  /** The update request was invalid. */
  Invalid = 2,
}

export default UpdateFarmerResult
