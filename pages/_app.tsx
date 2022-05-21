import '../styles/globals.scss';
import '../styles/normalize.scss';
import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-next-router';
import { useStore } from '../src/redux';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </Provider>
  );
}

export default MyApp;
