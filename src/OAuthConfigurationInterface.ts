/**
 * Interface to define the OAuth configuration.
 */
interface OAuthConfigutationInterface {
    /**
     * Get the login url.
     */
    getLoginUrl(): string;

    /**
     * Get the URL to fetch the token.
     */
    getTokenUrl(): string;

    /**
     * Get the URL to fetch the user information.
     */
    getUserInfoUrl(): string;

    /**
     * Get the scopes for the provider.
     */
    getScopes(): string[];
}

export {
    OAuthConfigutationInterface
}