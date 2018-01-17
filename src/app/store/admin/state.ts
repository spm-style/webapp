import {
  CHANGE_CURRENT_PACKAGE,
  changeCurrentPackage
} from './actions';

export interface Version {
  name:string,
  createdAt:Date,
  latest:boolean
}

export interface AdminPackage {
  name:string,
  createdAt:Date,
  lastUpdateAt:Date,
  lastDownloadAt:Date,
  owners:string[],
  versions:Version[],
  stars:number,
  downloads:number
}

export interface RDXAdminState {
  currentPackage:AdminPackage
}

export const ADMIN_INITIAL_STATE:RDXAdminState = {
  currentPackage:null
}

export function adminReducer(state:RDXAdminState = ADMIN_INITIAL_STATE, action):RDXAdminState{
  switch(action.type){
    case CHANGE_CURRENT_PACKAGE: return changeCurrentPackage(state, action.package)
    default:
      return state
  }
}
