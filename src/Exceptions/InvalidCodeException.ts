
/**
 * Implement a custom exception to handle invalid code.
 */
export class InvalidCodeException extends Error {
    constructor() {
      super(`Invalid code provided`);
    }
  }