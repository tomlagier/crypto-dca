import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './store';
import client from './graphql';

import Header from './containers/Header';
import CoinDashboard from './containers/CoinDashboard';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="main">
          <Header />
          <Route exact={true} path="/" component={CoinDashboard} />
        </div>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
