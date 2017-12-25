import { createActions } from 'redux-actions';
import { FSA } from '../../types/fsa';
import { Coin } from '../coins';
// import { Epic } from 'redux-observable';
// import { Observable } from 'rxjs';
// Remember to import your Observable operators

// Actions
export const ADD_COIN = 'coinDashboard/ADD_COIN';
export const SAVE_NEW_COIN = 'coinDashboard/SAVE_NEW_COIN';
export const CLOSE_DIALOG = 'coinDashboard/CLOSE_DIALOG';
export const REMOVE_COIN = 'coinDashboard/REMOVE_COIN';
export const EDIT_COIN = 'coinDashboard/EDIT_COIN';
export const SAVE_EDITS = 'coinDashboard/SAVE_EDITS';

export interface CoinDashboardState {
  activeCoin?: Coin;
  addDialogActive: boolean;
  sidebarOpen: boolean;
}

const initialCoinDashboardState: CoinDashboardState = {
  sidebarOpen: false,
  addDialogActive: false,
  activeCoin: null
};

// Reducer
export default function reducer(
  state: CoinDashboardState = initialCoinDashboardState,
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
    case SAVE_NEW_COIN:
      return {
        ...state,
        addDialogActive: false
      };
    default:
      return state;
  }
}

// Action creators
export const actions = createActions({
  coinDashboard: {
    ADD_COIN: (coin: Coin) => coin,
    SAVE_NEW_COIN: () => { },
    CLOSE_DIALOG: () => { }
  }
});

// Epics