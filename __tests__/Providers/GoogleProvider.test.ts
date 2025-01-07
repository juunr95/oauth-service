import GoogleAuthConfiguration from "../../src/Configuration/GoogleAuthConfiguration";
import GoogleAuthProvider from "../../src/Providers/GoogleAuthProvider";

describe('GoogleProvider', () => {
    it('should be able to authenticate with Google', () => {
        const provider = new GoogleAuthProvider({
            client_id: 'google-client-id',
            client_secret: 'google-client-secret',
            redirect_uri: 'http://localhost:3000/callback'
        }, new GoogleAuthConfiguration());

        const url = provider.getAuthorizationUrl();

        expect(url).toBe('https://accounts.google.com/o/oauth2/auth?client_id=google-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile');
    });
})