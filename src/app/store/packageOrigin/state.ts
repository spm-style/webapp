import {
  FETCH_PACKAGE_ORIGIN,
  fetchPackageOrigin,
  FETCH_CURRENT_PACKAGE_ORIGIN,
  fetchCurrentPackageOrigin,
  CLEAR_CURRENT_PACKAGE,
  clearCurrentPackage,
  CHANGE_VERSION_CURRENT_PACKAGE,
  changeVersionCurrentPackage
} from './actions';

import { RDXPackageOrigin } from './interfaces'


export const PACKAGE_ORIGIN_INITIAL_STATE:RDXPackageOrigin = {
  list: [],
  current: null,
  currentPage: null,
  isFinish: null
}

export function packageOriginReducer(state:RDXPackageOrigin = PACKAGE_ORIGIN_INITIAL_STATE, action):RDXPackageOrigin{
  switch(action.type){
    case FETCH_PACKAGE_ORIGIN: return fetchPackageOrigin(state, action.list)
    case FETCH_CURRENT_PACKAGE_ORIGIN: return fetchCurrentPackageOrigin(state, action.packageOrigin)
    case CLEAR_CURRENT_PACKAGE: return clearCurrentPackage(state)
    case CHANGE_VERSION_CURRENT_PACKAGE: return changeVersionCurrentPackage(state, action.packageNewVersion)
    default: return state
  }
}
