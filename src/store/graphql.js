import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
    fetch
  })
})
