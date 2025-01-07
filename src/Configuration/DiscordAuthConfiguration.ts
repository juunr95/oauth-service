import { OAuthConfigutationInterface } from "../OAuthConfigurationInterface";

/**
 * Configuration for the Discord OAuth provider.
 */
class DiscordAuthProvider implements OAuthConfigutationInterface {
    /**
     * @inheritdoc
     */
    getLoginUrl(): string {
        return "https://discord.com/oauth2/authorize";
    }

    /**
     * @inheritdoc
     */
    getTokenUrl(): string {
        return "https://discord.com/api/v10/oauth2/token";
    }

    /**
     * @inheritdoc
     */
    getUserInfoUrl(): string {
        return "https://discord.com/api/users/@me";
    }

    /**
     * @inheritdoc
     */
    getScopes(): string[] {
        return [
           "identify"
        ];
    }   
}

export default DiscordAuthProvider;