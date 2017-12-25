import { createActions } from 'redux-actions';
import { FSA } from '../../types/fsa';
import { Coin } from '../coins';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { reset } from 'redux-form';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { createCoin } from '../coins';
// Remember to import your Observable operators

const { defer, concat, of } = Observable;

// Actions
export const ADD_COIN = 'coinDashboard/ADD_COIN';
export const SAVE_NEW_COIN = 'coinDashboard/SAVE_NEW_COIN';
export const SAVE_COIN_SUCCESS =
  'coinDashboard/SAVE_COIN_SUCCESS';
export const CLOSE_DIALOG = 'coinDashboard/CLOSE_DIALOG';
export const REMOVE_COIN = 'coinDashboard/REMOVE_COIN';
export const EDIT_COIN = 'coinDashboard/EDIT_COIN';
export const SAVE_EDITS = 'coinDashboard/SAVE_EDITS';

export interface CoinDashboardState {
  activeCoin?: Coin;
  addDialogActive: boolean;
  sidebarOpen: boolean;
  saving: boolean;
}

const initialCoinDashboardState: CoinDashboardState = {
  sidebarOpen: false,
  addDialogActive: false,
  activeCoin: null,
  saving: false
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
    case SAVE_COIN_SUCCESS:
      return {
        ...state,
        saving: false,
        addDialogActive: false
      };
    case SAVE_NEW_COIN:
      return {
        ...state,
        saving: true
      };
    default:
      return state;
  }
}

// Action creators
export const actions = createActions({
  coinDashboard: {
    ADD_COIN: () => {},
    SAVE_NEW_COIN: (coin: Coin) => coin,
    SAVE_COIN_SUCCESS: () => {},
    CLOSE_DIALOG: () => {}
  }
});

// Epics
const { coinDashboard: { saveCoinSuccess } } = actions;
export const saveCoin: Epic<FSA, any> = action$ =>
  action$
    .ofType(SAVE_NEW_COIN)
    .mergeMap(({ payload: newCoin }) =>
      defer(async () => {
        await createCoin(newCoin);
      })
    )
    .mergeMap(() =>
      concat(of(saveCoinSuccess()), of(reset('addCoin')))
    );
