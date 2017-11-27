import {
  // actions
  TEST_PACKAGES,
  FETCH_PACKAGES_LIST,

  // function-actions
  testPackages,
  fetchPAckagesList
} from './actions';

interface IResponsiveness {
  name: string,
  size: {
    h: number,
    w: number
  }
}

export interface IPackage {
  description: string,
  distTags: {},
  iframe: string,
  name: string,
  responsiveness: IResponsiveness[],
  style: string,
  type: string
}

export interface RDXPackagesState {
  testPackages: string,
  list: IPackage[]
}

export const PACKAGES_INITIAL_STATE:RDXPackagesState = {
  testPackages: 'packages-testing',
  list: []
}

export function packagesReducer(state:RDXPackagesState = PACKAGES_INITIAL_STATE, action):RDXPackagesState{
  switch(action.type){
    case TEST_PACKAGES: return testPackages(state);
    case FETCH_PACKAGES_LIST: return fetchPAckagesList(state, action.list);
    default: return state;
  }
}
