
/**
 * Custom error class representing an invalid request error.
 * This error is used to indicate that the request is invalid.
 */
export class InvalidRequestError extends Error {
  /**
   * Creates a new instance of the InvalidRequestError class.
   * Initializes the error message and sets the name of the error.
   *
   * @param message - The error message to initialize the error with.
   */
  constructor(message: string) {
    super(message)
    this.name = 'InvalidRequestError'
  }
}

/**
 * Custom error class representing a unique constraint violation error.
 * This error is used to indicate a violation of a unique constraint.
 */
export class UniqueConstraintViolationError extends Error {
  /**
   * Creates a new instance of the UniqueConstraintViolationError class.
   * Initializes the error message and sets the name of the error.
   *
   * @param message - The error message to initialize the error with.
   */
  constructor(message: string) {
    super(message)
    this.name = 'UniqueConstraintViolationError'
  }
}

/**
 * Custom error class representing a resource not found error.
 * This error is used to indicate that a requested resource was not found.
 */
export class ResourceNotFoundError extends Error {
  /**
   * Creates a new instance of the ResourceNotFoundError class.
   * Initializes the error message and sets the name of the error.
   *
   * @param message - The error message to initialize the error with.
   */
  constructor(message: string) {
    super(message)
    this.name = 'ResourceNotFoundError'
  }
}

/**
 * Custom error class representing a backdoor error.
 * This error is used for testing and debugging purposes to simulate specific error scenarios.
 */
export class BackdoorError extends Error {
  /**
   * Creates a new instance of the BackdoorError class.
   * Initializes the error message and sets the name of the error.
   *
   * @param message - The error message to initialize the error with.
   */
  constructor(message: string) {
    super(message)
    this.name = 'BackdoorError'
  }
}
