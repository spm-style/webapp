import {
  CHANGE_CURRENT_PACKAGE,
  ADD_CURRENT_PACKAGE_CONTRIBUTOR,
  REMOVE_CURRENT_PACKAGE_CONTRIBUTOR,
  REMOVE_CURRENT_PACKAGE_VERSION,
  changeCurrentPackage,
  addCurrentPackageContributor,
  removeCurrentPackageContributor,
  removeCurrentPackageVersion
} from './actions';

import { RDXAdminState } from './interfaces'

export const ADMIN_INITIAL_STATE:RDXAdminState = {
  currentPackage:null
}

export function adminReducer(state:RDXAdminState = ADMIN_INITIAL_STATE, action):RDXAdminState{
  switch(action.type){
    case CHANGE_CURRENT_PACKAGE: return changeCurrentPackage(state, action.package)
    case ADD_CURRENT_PACKAGE_CONTRIBUTOR: return addCurrentPackageContributor(state, action.user)
    case REMOVE_CURRENT_PACKAGE_CONTRIBUTOR: return removeCurrentPackageContributor(state, action.login)
    case REMOVE_CURRENT_PACKAGE_VERSION: return removeCurrentPackageVersion(state, action.version)
    default:
      return state
  }
}
