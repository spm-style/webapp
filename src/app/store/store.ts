import { combineReducers } from 'redux';

import { appReducer, APP_INITIAL_STATE } from './app/state';
import { RDXAppState } from './app'

import { adminReducer, ADMIN_INITIAL_STATE } from './admin/state'
import { RDXAdminState } from './admin'

import { docReducer, DOC_INITIAL_STATE } from './doc/state';
import { RDXDocState } from './doc'

import { navigationReducer, NAVIGATION_INITIAL_STATE, } from './navigation/state'
import { RDXNavigationState } from './navigation'

import { userReducer, USER_INITIAL_STATE } from './user/state'
import { RDXUser } from './user'

import { packageOriginReducer, PACKAGE_ORIGIN_INITIAL_STATE } from './packageOrigin/state'
import { RDXPackageOrigin } from './packageOrigin'


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
