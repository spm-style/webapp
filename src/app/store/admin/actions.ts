export const CHANGE_CURRENT_PACKAGE = 'CHANGE_CURRENT_PACKAGE';

export let changeCurrentPackage = (state, currentPackage) => {
  return {
    ...state,
    currentPackage
  }
}
