
/**
 * Implement a custom exception to handle provider not found.
 */
export class ProviderNotFoundException extends Error {
  constructor(providerName: string) {
    super(`Provider ${providerName} not found`);
  }
}