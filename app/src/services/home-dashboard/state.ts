import { createActions } from 'redux-actions';
import { FSA } from '../../types/fsa';
import { Coin, createCoin } from '../coins';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { reset } from 'redux-form';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import {
  GraphQLErrorResponse,
  GraphQLError
} from '../../types/error';
// Remember to import your Observable operators

const { defer, of } = Observable;

// Actions
export const ADD_COIN = 'homeDashboard/ADD_COIN';
export const SAVE_NEW_COIN = 'homeDashboard/SAVE_NEW_COIN';
export const SAVE_COIN_SUCCESS =
  'homeDashboard/SAVE_COIN_SUCCESS';
export const SAVE_COIN_ERROR =
  'homeDashboard/SAVE_COIN_ERROR';
export const CLOSE_DIALOG = 'homeDashboard/CLOSE_DIALOG';
export const REMOVE_COIN = 'homeDashboard/REMOVE_COIN';
export const EDIT_COIN = 'homeDashboard/EDIT_COIN';
export const SAVE_EDITS = 'homeDashboard/SAVE_EDITS';

export interface HomeDashboardState {
  activeCoin?: Coin;
  addDialogActive: boolean;
  sidebarOpen: boolean;
  saving: boolean;
  errors?: GraphQLError[];
}

const initialHomeDashboardState: HomeDashboardState = {
  sidebarOpen: false,
  addDialogActive: false,
  activeCoin: null,
  saving: false,
  errors: null
};

// Reducer
export default function reducer(
  state: HomeDashboardState = initialHomeDashboardState,
  { type, payload }: FSA
) {
  switch (type) {
    case ADD_COIN:
      return {
        ...state,
        addDialogActive: true
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        addDialogActive: false
      };
    case SAVE_COIN_SUCCESS:
      return {
        ...state,
        saving: false,
        addDialogActive: false,
        errors: null
      };
    case SAVE_COIN_ERROR:
      return {
        ...state,
        saving: false,
        errors: payload
      };
    case SAVE_NEW_COIN:
      return {
        ...state,
        saving: true,
        errors: null
      };
    default:
      return state;
  }
}

// Action creators
export const actions = createActions({
  homeDashboard: {
    ADD_COIN: () => {},
    SAVE_NEW_COIN: (coin: Coin) => coin,
    SAVE_COIN_SUCCESS: () => {},
    SAVE_COIN_ERROR: (err: GraphQLErrorResponse) => err,
    CLOSE_DIALOG: () => {}
  }
});

// Epics
const {
  homeDashboard: { saveCoinSuccess, saveCoinError }
} = actions;
export const saveCoin: Epic<FSA, any> = action$ =>
  action$
    .ofType(SAVE_NEW_COIN)
    .mergeMap(({ payload: newCoin }) =>
      defer(() => createCoin(newCoin))
        .concatMap(result =>
          of(saveCoinSuccess(), reset('addCoin'))
        )
        .catch(({ graphQLErrors }) =>
          of(saveCoinError(graphQLErrors))
        )
    );
