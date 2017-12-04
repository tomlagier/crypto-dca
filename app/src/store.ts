import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Reducers
import { default as user, logIn, logOut } from './services/auth/state';
export const history = createHistory();

const rootReducer = combineReducers({
    user,
    router: routerReducer
});

// Epics
const rootEpic = combineEpics(
    logIn, logOut
);

const composeEnhancers: Function = (<any> window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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