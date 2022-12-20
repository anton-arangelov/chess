// ./apollo-client.tsx

import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient, WebSocket } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: 'https://famous-klepon-d7c87d.netlify.app/graphql'
  // uri: 'https://api.apps.us.bluescape.com/v3/graphql'
})

const wsLink = () =>
  new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:3000/graphql'
    })
  )

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = () =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink(),
    httpLink
  )

const client = new ApolloClient({
  link: typeof window === 'undefined' ? httpLink : splitLink(),
  cache: new InMemoryCache()
})

export default client
