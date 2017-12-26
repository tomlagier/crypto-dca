import { createActions } from 'redux-actions';
import { FSA } from '../../types/fsa';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { reset } from 'redux-form';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import { Wallet, createWallet } from '../wallets';
import {
  GraphQLErrorResponse,
  GraphQLError
} from '../error';
// Remember to import your Observable operators

const { defer, of } = Observable;

// Actions
export const ADD_WALLET = 'walletDashboard/ADD_WALLET';
export const SAVE_NEW_WALLET =
  'walletDashboard/SAVE_NEW_WALLET';
export const SAVE_WALLET_SUCCESS =
  'walletDashboard/SAVE_WALLET_SUCCESS';
export const SAVE_WALLET_ERROR =
  'walletDashboard/SAVE_WALLET_ERROR';
export const CLOSE_DIALOG = 'walletDashboard/CLOSE_DIALOG';
export const REMOVE_WALLET =
  'walletDashboard/REMOVE_WALLET';
export const EDIT_WALLET = 'walletDashboard/EDIT_WALLET';
export const SAVE_EDITS = 'walletDashboard/SAVE_EDITS';

export interface WalletDashboardState {
  activeWallet?: Wallet;
  addDialogActive: boolean;
  sidebarOpen: boolean;
  saving: boolean;
  errors?: GraphQLError[];
}

const initialWalletDashboardState: WalletDashboardState = {
  sidebarOpen: false,
  addDialogActive: false,
  activeWallet: null,
  saving: false,
  errors: null
};

// Reducer
export default function reducer(
  state: WalletDashboardState = initialWalletDashboardState,
  { type, payload }: FSA
) {
  switch (type) {
    case ADD_WALLET:
      return {
        ...state,
        addDialogActive: true
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        addDialogActive: false
      };
    case SAVE_WALLET_SUCCESS:
      return {
        ...state,
        saving: false,
        addDialogActive: false,
        errors: null
      };
    case SAVE_WALLET_ERROR:
      return {
        ...state,
        saving: false,
        errors: payload
      };
    case SAVE_NEW_WALLET:
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
  walletDashboard: {
    ADD_WALLET: () => {},
    SAVE_NEW_WALLET: (wallet: Wallet) => wallet,
    SAVE_WALLET_SUCCESS: () => {},
    SAVE_WALLET_ERROR: (err: GraphQLErrorResponse) => err,
    CLOSE_DIALOG: () => {}
  }
});

// Epics
const {
  walletDashboard: { saveWalletSuccess, saveWalletError }
} = actions;
export const saveWallet: Epic<FSA, any> = action$ =>
  action$
    .ofType(SAVE_NEW_WALLET)
    .mergeMap(({ payload: newWallet }) =>
      defer(() => createWallet(newWallet))
        .concatMap(result =>
          of(saveWalletSuccess(), reset('addWallet'))
        )
        .catch(({ graphQLErrors }) =>
          of(saveWalletError(graphQLErrors))
        )
    );
