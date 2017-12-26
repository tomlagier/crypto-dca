import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import {
  combineEpics,
  createEpicMiddleware
} from 'redux-observable';
import {
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { reducer as formReducer } from 'redux-form';

// Reducers
import {
  default as user,
  logIn,
  logOut
} from './services/auth/state';
export const history = createHistory();

import {
  default as coinDashboard,
  saveCoin
} from './services/coin-dashboard/state';

import {
  default as walletDashboard,
  saveWallet
} from './services/wallet-dashboard/state';
const rootReducer = combineReducers({
  user,
  form: formReducer,
  router: routerReducer,
  coinDashboard,
  walletDashboard
});

// Epics
const rootEpic = combineEpics(
  logIn,
  logOut,
  saveCoin,
  saveWallet
);

const composeEnhancers: Function =
  /* tslint:disable */
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  /* tslint:enable */
  compose;
export const store = createStore(
  rootReducer,
  // , preloadedState
  composeEnhancers(
    applyMiddleware(
      createEpicMiddleware(rootEpic),
      routerMiddleware(history)
    )
  )
);

export default store;
