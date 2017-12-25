import { createActions } from 'redux-actions';
import { FSA } from '../../types/fsa';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import { push } from 'react-router-redux';
const { concat, of, defer } = Observable;

// Actions
export const LOG_IN = 'auth/LOG_IN';
export const LOG_OUT = 'auth/LOG_OUT';
export const LOGGED_OUT = 'auth/LOGGED_OUT';

// Reducer
export default function reducer(
  state: {} = {},
  { type, payload }: FSA
) {
  switch (type) {
    default:
      return state;
  }
}

// Action creators
export const actions = createActions({
  auth: {
    LOG_IN: null,
    LOG_OUT: (resetStore: Function) => resetStore,
    LOGGED_OUT: null
  }
});

// Epics
export const logIn: Epic<FSA, any> = action$ =>
  action$
    .ofType(LOG_IN)
    .do(
      () =>
        (window.location.href =
          'http://localhost:8088/auth/github')
    )
    .ignoreElements();

const { auth: { loggedOut } } = actions;
export const logOut: Epic<FSA, any> = action$ =>
  action$
    .ofType(LOG_OUT)
    .mergeMap(({ payload: resetStore }) =>
      defer(async () => {
        await fetch('http://localhost:8088/logout', {
          method: 'POST',
          credentials: 'include'
        });
        resetStore();
      })
    )
    .mergeMap(() => concat(of(loggedOut()), of(push('/'))));
