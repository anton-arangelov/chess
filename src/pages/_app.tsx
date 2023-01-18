import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import client from '../../apollo-client'
import { wrapper } from '../store/store'
import { DefaultLayout } from '../components/DefaultLayout'

function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps)
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ApolloProvider>
    </Provider>
  )
}

export default App
