import { OAuthConfigutationInterface } from "../OAuthConfigurationInterface";

/**
 * Configuration for the Google OAuth provider.
 */
class GoogleAuthConfiguration implements OAuthConfigutationInterface {
    /**
     * @inheritdoc
     */
    getLoginUrl(): string {
        return "https://accounts.google.com/o/oauth2/auth";
    }

    /**
     * @inheritdoc
     */
    getTokenUrl(): string {
        return "https://accounts.google.com/o/oauth2/token";
    }

    /**
     * @inheritdoc
     */
    getUserInfoUrl(): string {
        return "https://www.googleapis.com/oauth2/v1/userinfo";
    }

    /**
     * @inheritdoc
     */
    getScopes(): string[] {
        return [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ];
    }   
}

export default GoogleAuthConfiguration;