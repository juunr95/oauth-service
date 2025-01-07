import { OAuthConfigutationInterface } from "../OAuthConfigurationInterface";

/**
 * Configuration for the Google OAuth provider.
 */
class GitAuthConfiguration implements OAuthConfigutationInterface {
    /**
     * @inheritdoc
     */
    getLoginUrl(): string {
        return "https://github.com/login/oauth/authorize";
    }

    /**
     * @inheritdoc
     */
    getTokenUrl(): string {
        return "https://github.com/login/oauth/access_token";
    }

    /**
     * @inheritdoc
     */
    getUserInfoUrl(): string {
        return "https://api.github.com/user";
    }

    /**
     * @inheritdoc
     */
    getScopes(): string[] {
        return [
            "user:email"
        ];
    }   
}

export default GitAuthConfiguration;