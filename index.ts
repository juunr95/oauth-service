import Fastify from 'fastify';
import { AuthProviderFactory } from './src/Factories/AuthProviderFactory';
import { config } from 'dotenv';
import { randomBytes } from 'crypto';

// Load environment variables.
config();

const server = Fastify();

type LoginRequestType = {
    provider: string;
}

type CallbackResponseType = {
    code: string;
}

type CallbackParamsType = {
    provider: string;
}

server.post<{ Body: LoginRequestType }>('/login', async (request, reply) => {
    const { provider: providerName } = request.body;

    try {
        const provider = await AuthProviderFactory.create(providerName);
    
        if (provider instanceof Error) {
            throw provider;
        }

        const url = provider.getAuthorizationUrl();

        reply.send({
            url
        });
    } catch (error) {
        reply.status(500).send({
            error: error.message
        });
    }
});

server.get<{ Querystring: CallbackResponseType; Params: CallbackParamsType }>(
    '/auth/:provider/callback',
    async (request, reply) => {
      try {
        const { code } = request.query;
        const { provider: providerName } = request.params;
  
        const provider = await AuthProviderFactory.create(providerName);
        if (provider instanceof Error) {
          throw provider;
        }
  
        const authorization = await provider.handleCallback(code);
        if (authorization instanceof Error) {
          throw authorization;
        }
  
        const user = await provider.fetchUserData(authorization.access_token);
        if (user instanceof Error) {
          throw user;
        }
  
        // Use a more robust random token approach, e.g. crypto:
        const token = randomBytes(16).toString('hex');
  
        reply.send({ token, user });
      } catch (error) {
        // Ensure we catch both Error instances and unknown error shapes.
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        reply.status(500).send({ error: message });
      }
    }
  );

server.listen({ port: 3000}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${address}`);
});

