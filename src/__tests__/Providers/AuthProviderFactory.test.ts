import { ProviderNotFoundException } from "../../Exceptions/ProviderNotFoundException";
import { AuthProviderFactory } from "../../Factories/AuthProviderFactory";

describe('AuthFactoryProvider', () => {
    it('should be able to authenticate with Google', async () => {
        // Set the environment variables.
        process.env = {
            GOOGLE_CLIENT_ID: 'google-client-id',
            GOOGLE_CLIENT_SECRET: 'google-client-secret',
            GOOGLE_REDIRECT_URI: 'http://localhost:3000/callback'
        }

        const provider = await AuthProviderFactory.create('google');

        if (provider instanceof Error) {
            throw provider;
        }

        const url = provider.getAuthorizationUrl();

        expect(url).toBe('https://accounts.google.com/o/oauth2/auth?client_id=google-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile');
    });

    it('should be able to authenticate with Facebook', async () => {
        try {
            await AuthProviderFactory.create('facebook');
        } catch (err) {
            expect(err).toBeInstanceOf(ProviderNotFoundException);
        }
    });
})