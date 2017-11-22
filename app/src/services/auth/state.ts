import { createActions } from 'redux-actions';
import { FSA } from '../../types/fsa';
// import { Epic } from 'redux-observable';
// import { Observable } from 'rxjs';

// Actions
export const LOG_IN = 'auth/LOG_IN';
export const CHECK_LOGGED_IN = 'auth/CHECK_LOGGED_IN';
export const LOGGED_IN = 'auth/LOGGED_IN';
export const LOG_OUT = 'auth/LOG_OUT';

// Reducer
interface User {
  name?: string;
}

const initialState: User = {
  name: undefined
};

export default function reducer(state: User = initialState, { type, payload }: FSA) {
  switch (type) {
    case LOGGED_IN:
      return {
        ...state,
        user: payload
      };
    case LOG_OUT:
      return {
        ...state,
        user: undefined
      };
    default:
      return state;
  }
}

// Action creators
export const actions = createActions({
  auth: {
    LOG_IN: () => window.location.href = 'http://localhost:8088/auth/github',
    LOGGED_IN: (u: User) => u,
    LOG_OUT: () => fetch('http://localhost:8088/logout', {
      method: 'POST',
      credentials: 'include'
    })
  }
});