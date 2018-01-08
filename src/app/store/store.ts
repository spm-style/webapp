import { combineReducers } from 'redux';

import { appReducer, APP_INITIAL_STATE, RDXAppState } from './app/state';
import { docReducer, DOC_INITIAL_STATE, RDXDocState } from './doc/state';
import { navigationReducer, NAVIGATION_INITIAL_STATE, RDXNavigationState } from './navigation/state'

import { packageOriginReduxer, PACKAGE_ORIGIN_INITIAL_STATE } from './packageOrigin/state'
import { RDXPackageOrigin } from './packageOrigin/interfaces'

export interface RDXRootState {
  app: RDXAppState,
  doc: RDXDocState,
  navigation: RDXNavigationState,
  packageOrigin: RDXPackageOrigin
}

export const ROOT_INITIAL_STATE:RDXRootState = {
  app: APP_INITIAL_STATE,
  doc: DOC_INITIAL_STATE,
  navigation: NAVIGATION_INITIAL_STATE,
  packageOrigin: PACKAGE_ORIGIN_INITIAL_STATE
}

export const rootReducer = combineReducers({
  app: appReducer,
  doc: docReducer,
  navigation: navigationReducer,
  packageOrigin: packageOriginReduxer
})
