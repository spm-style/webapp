import { combineReducers } from 'redux';

import { appReducer, APP_INITIAL_STATE, RDXAppState } from './app/state';
import { docReducer, DOC_INITIAL_STATE, RDXDocState } from './doc/state';

import { packageOriginReduxer, PACKAGE_ORIGIN_INITIAL_STATE } from './packageOrigin/state'
import { RDXPackageOrigin } from './packageOrigin/interfaces'

export interface RDXRootState {
  app: RDXAppState,
  doc: RDXDocState,
  packageOrigin: RDXPackageOrigin
}

export const ROOT_INITIAL_STATE:RDXRootState = {
  app: APP_INITIAL_STATE,
  doc: DOC_INITIAL_STATE,
  packageOrigin: PACKAGE_ORIGIN_INITIAL_STATE
}

export const rootReducer = combineReducers({
  app: appReducer,
  doc: docReducer,
  packageOrigin: packageOriginReduxer
});
