import { ApolloClient, InMemoryCache } from '@apollo/client';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_SERVER_GRAPHQL,
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'wss://mutual-donkey-42.hasura.app/v1/graphql',
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;

// const client = new ApolloClient({
//     // uri: 'https://social-monarch-98.hasura.app/v1/graphql',
//     uri: 'https://mutual-donkey-42.hasura.app/v1/graphql',
//     // uri: process.env.REACT_APP_SERVER_GRAPHQL,
//     headers: {
//         'x-hasura-admin-secret':
//             // 'BIVee1gzUno7AUb18M7a6tleepltnWWkwsh5iYoE0UMoy5jZt5Jb9pvMIlhTngzd',
//             'hQrq3anmdasvBP95CLaOYTXUtdfrZTGJYtEcm0Rihn4MP6KgK3oUX9JWjH3LLsKc',
//             // process.env.REACT_APP_SERVER_GRAPHQL
//     },
//     cache: new InMemoryCache(),
// });

// export default client;