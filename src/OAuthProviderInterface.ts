/**
 * The AuthenticatedUser interface.
 */
type AuthenticatedUser = {
    id: string;
    email: string;
    name: string;
    picture: string;
}

/**
 * The OAuthProviderCredentials interface.
 */
type OAuthProviderCredentials = {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
}

/**
 * The AuthorizationResponseType interface.
 */
type AuthorizationResponseType = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

/**
 * The OAuthProvider interface.
 */
interface OAuthProvider {
    /**
     * Generate the login URL for the provider.
     */
    getAuthorizationUrl(): string;

    /**
     * Swap the code for the token.
     * 
     * @param code - The code to swap for the token.
     */
    handleCallback(code: string): Promise<AuthorizationResponseType | Error>;

    /**
     * Fetch the user data using the token.
     * 
     * @param token - The token to fetch the user data.
     */
    fetchUserData(token: string): Promise<AuthenticatedUser | Error>;
}

export {
    AuthenticatedUser,
    OAuthProvider,
    OAuthProviderCredentials,
    AuthorizationResponseType
}