import { combineReducers } from 'redux';

import { appReducer, APP_INITIAL_STATE, RDXAppState } from './app/state';
import { docReducer, DOC_INITIAL_STATE, RDXDocState } from './doc/state';
import { navigationReducer, NAVIGATION_INITIAL_STATE, RDXNavigationState } from './navigation/state'
import { packageOriginReducer, PACKAGE_ORIGIN_INITIAL_STATE } from './packageOrigin/state'
import { userReducer, USER_INITIAL_STATE } from './user/state'
import { adminReducer, ADMIN_INITIAL_STATE, RDXAdminState } from './admin/state'

import { RDXPackageOrigin } from './packageOrigin/interfaces'
import { RDXUser } from './user/interfaces'

export interface RDXRootState {
  admin: RDXAdminState,
  app: RDXAppState,
  doc: RDXDocState,
  navigation: RDXNavigationState,
  packageOrigin: RDXPackageOrigin,
  user: RDXUser
}

export const ROOT_INITIAL_STATE:RDXRootState = {
  admin: ADMIN_INITIAL_STATE,
  app: APP_INITIAL_STATE,
  doc: DOC_INITIAL_STATE,
  navigation: NAVIGATION_INITIAL_STATE,
  packageOrigin: PACKAGE_ORIGIN_INITIAL_STATE,
  user: USER_INITIAL_STATE
}

export const rootReducer = combineReducers({
  admin: adminReducer,
  app: appReducer,
  doc: docReducer,
  navigation: navigationReducer,
  packageOrigin: packageOriginReducer,
  user: userReducer
})
