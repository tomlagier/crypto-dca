import { createActions } from 'redux-actions';
import { FSA } from '../../types/fsa';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
// Remember to import your Observable operators

// Actions

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
  options: {

  }
});

// Epics