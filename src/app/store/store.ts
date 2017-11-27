import { combineReducers } from 'redux';

import { appReducer, APP_INITIAL_STATE, RDXAppState } from './app/state';
import { packagesReducer, PACKAGES_INITIAL_STATE, RDXPackagesState } from './packages/state';

export interface RDXRootState {
  app: RDXAppState,
  packages: RDXPackagesState
}

export const ROOT_INITIAL_STATE:RDXRootState = {
  app: APP_INITIAL_STATE,
  packages: PACKAGES_INITIAL_STATE
}

export const rootReducer = combineReducers({
  app: appReducer,
  packages: packagesReducer
});
