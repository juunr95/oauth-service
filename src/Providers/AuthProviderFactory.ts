import { capitalize } from 'lodash';
import { OAuthProvider } from '../OAuthProviderInterface';
import { ProviderNotFoundException } from '../Exceptions/ProviderNotFoundException';

type FactoryCreateReturnType = OAuthProvider | Error;

/**
 * Factory class to create a new instance of the provider.
 */
export class AuthProviderFactory {

    /**
     * Create a new instance of the provider.
     * 
     * @param provider - The provider to create.
     * @param params - The parameters for the provider.
     */
    static async create(provider: string): Promise<FactoryCreateReturnType> {
        const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`];
        const clientSecret = process.env[`${provider.toUpperCase()}_CLIENT_SECRET`];
        const redirectUri = process.env[`${provider.toUpperCase()}_REDIRECT_URI`];

        const params = {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri
        }

        try {
            const providerClass = await this.getProviderClass(provider);
            const configuration = await this.getProviderConfig(provider);

            return new providerClass(params, new configuration());
        } catch (error) {
            throw new ProviderNotFoundException(provider);
        }
    }

    /**
     * Get the provider class.
     * 
     * @param provider - The provider to get the class.
     * @returns - The provider class.
     */
    static async getProviderClass(provider: string) {
        const providerClass = await import(`./${capitalize(provider)}AuthProvider`);

        return providerClass.default;
    }

    /**
     * Get the provider configuration.
     * 
     * @param provider - The provider to get the configuration.
     * @returns - The provider configuration.
     */
    static async getProviderConfig(provider: string) {
        const configurationClass = await import(`../Configuration/${capitalize(provider)}AuthConfiguration`);

        return configurationClass.default;
    }
}