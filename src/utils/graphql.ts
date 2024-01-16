import { deleteCookie, getCookie } from 'cookies-next'
import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  createHttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { gql } from 'graphql-tag'
import { onError } from '@apollo/client/link/error'
import { COOKIES_KEY } from '@models/keys'
import { NOTIFICATION_TYPE, notify } from './notify'
import { setCurrentPage } from './sessionStorage'

const graphServerUri = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:16000/graphql'
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const httpLink = createHttpLink({
  uri: graphServerUri,
})

const authLink = setContext((_, { headers }) => {
  const token = getCookie(COOKIES_KEY.WEB_ACCESS_TOKEN, {
    // domain: COOKIE_DOMAIN,
  }) as string
  let accessToken = ''
  if (token) {
    try {
      const tokenObj = JSON.parse(token)
      accessToken = tokenObj.appAccessToken
    } catch (error) {
      console.error('Error parsing access token:', error)
    }
  }

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      const { code } = error.extensions
      if (code === 'TOKEN_EXPIRED' || code === 'UNAUTHENTICATED') {
        setCurrentPage(`${location.pathname}${location.search}`)
        deleteCookie(COOKIES_KEY.WEB_ACCESS_TOKEN)
        deleteCookie(COOKIES_KEY.WEB_ACCOUNT_INFO)
        error.message ? notify(NOTIFICATION_TYPE.INFO, error.message) : null
        location.reload()
      }
    }
  }
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    // link: authLink.concat(httpLink),
    defaultOptions,
  })
}

function getClient() {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (typeof window === 'undefined') {
    return _apolloClient
  }

  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export { getClient, gql }
