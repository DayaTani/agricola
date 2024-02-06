/**
 * Custom error class representing a backdoor error.
 * This error is used for testing and debugging purposes to simulate specific error scenarios.
 * It extends the built-in Error class.
 */
export default class BackdoorError extends Error {
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
