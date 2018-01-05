import {
  FETCH_PACKAGE_ORIGIN,
  fetchPackageOrigin,
  FETCH_CURRENT_PACKAGE_ORIGIN,
  fetchCurrentPackageOrigin,
  CLEAR_CURRENT_PACKAGE_ORIGIN,
  clearCurrentPackageOrigin,
  CURRENT_IN_LIST,
  setCurrentInList
} from './actions';

import {
  RDXPackageOrigin
} from './interfaces'


export const PACKAGE_ORIGIN_INITIAL_STATE:RDXPackageOrigin = {
  list: [],
  current: null,
  currentInList: null,
  currentPage: null,
  isFinish: null
}

export function packageOriginReduxer(state:RDXPackageOrigin = PACKAGE_ORIGIN_INITIAL_STATE, action):RDXPackageOrigin{
  switch(action.type){
    case FETCH_PACKAGE_ORIGIN: return fetchPackageOrigin(state, action.list)
    case FETCH_CURRENT_PACKAGE_ORIGIN: return fetchCurrentPackageOrigin(state, action.current)
    case CLEAR_CURRENT_PACKAGE_ORIGIN: return clearCurrentPackageOrigin(state)

    case CURRENT_IN_LIST: return setCurrentInList(state, action.currentInList)
    default: return state
  }
}
