import { InvalidCodeException } from "../Exceptions/InvalidCodeException";
import { OAuthConfigutationInterface } from "../OAuthConfigurationInterface";
import { OAuthProvider, AuthenticatedUser, OAuthProviderCredentials, AuthorizationResponseType } from "../OAuthProviderInterface";
import { stringify } from 'querystring';

class GoogleAuthProvider implements OAuthProvider {
    /**
     * Credentials for the provider.
     */
    private credentials: OAuthProviderCredentials

    /**
     * Group of links for the provider.
     */
    private configuration: OAuthConfigutationInterface;

    /**
     * @inheritdoc
     */
    constructor(params: OAuthProviderCredentials, configuration: OAuthConfigutationInterface) {
        this.credentials = params;
        this.configuration = configuration
    }

    /**
     * @inheritdoc
     */
    getAuthorizationUrl(): string {
        // Create a new URL object with the login URL.
        const url = new URL(this.configuration.getLoginUrl());

        // Set the query parameters.
        const params = {
            client_id: this.credentials.client_id,
            redirect_uri: this.credentials.redirect_uri,
            response_type: 'code',
            access_type: 'offline',
            scope: this.configuration.getScopes().join(' ')
        }

        // Stringify the query parameters.
        const query = stringify(params);

        // Set the query parameters.
        url.search = query;

        // Return the URL as a string.
        return url.toString();
    }

    /**
     * @inheritdoc
     */
    async handleCallback(code?: string): Promise<AuthorizationResponseType | Error> {
        if (!code) {
            throw new InvalidCodeException();
        }

        const payload = stringify({
            code,
            client_id: this.credentials.client_id,
            client_secret: this.credentials.client_secret,
            redirect_uri: this.credentials.redirect_uri,
            grant_type: 'authorization_code'
        })

        const response = await fetch(this.configuration.getTokenUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload
        })

        if (!response.ok) {
            throw new Error(`Token request failed. Status: ${response.status}`);
        }

        return (await response.json()) as AuthorizationResponseType;
    }

    /**
     * @inheritdoc
     */
    async fetchUserData(token?: string): Promise<AuthenticatedUser | Error> {
        if (!token) {
            throw new Error('Token not provided');
        }
        
        // Fetch user data.
        const response = await fetch(this.configuration.getUserInfoUrl(), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Token request failed. Status: ${response.status}`);
        }

        return (await response.json()) as AuthenticatedUser;
    }
}

export default GoogleAuthProvider;