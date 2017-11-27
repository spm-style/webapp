export const TEST_PACKAGES = 'TEST_PACKAGES';
export const FETCH_PACKAGES_LIST = 'FETCH_PACKAGES_LIST';

export let testPackages = (state) => {
  return {
    ...state
  }
}

export let fetchPAckagesList = (state, list) => {
  return {
    ...state,
    list: state.list.concat(list)
  }
}
