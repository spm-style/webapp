import { IPackageOrigin, RDXPackageOrigin } from './interfaces';

export const FETCH_PACKAGE_ORIGIN = 'FETCH_PACKAGE_ORIGIN'
export const FETCH_CURRENT_PACKAGE_ORIGIN = 'FETCH_CURRENT_PACKAGE_ORIGIN'
export const CLEAR_CURRENT_PACKAGE_ORIGIN = 'CLEAR_CURRENT_PACKAGE_ORIGIN'

export const CURRENT_IN_LIST = 'CURRENT_IN_LIST'

export let fetchPackageOrigin = (state:RDXPackageOrigin, list:IPackageOrigin[]):RDXPackageOrigin => {
  return {
    ...state,
    list: state.list.concat(list),
    currentPage: 1,
    isFinish: true
  }
}

export let fetchCurrentPackageOrigin = (state: RDXPackageOrigin, current:IPackageOrigin):RDXPackageOrigin => {
  return {
    ...state,
    current
  }
}

export let clearCurrentPackageOrigin = (state: RDXPackageOrigin):RDXPackageOrigin => {
  return {
    ...state,
    current: null
  }
}

export let setCurrentInList = (state: RDXPackageOrigin, currentInList:any):RDXPackageOrigin => {
  return {
    ...state,
    currentInList
  }
}
