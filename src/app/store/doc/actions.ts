export const CHANGE_CURRENT_DOC = 'CHANGE_CURRENT_DOC';

export let changeCurrentDoc = (state, currentDoc, nextDoc, previousDoc, nextDocUrl, previousDocUrl) => {
  return {
    ...state,
    currentDoc,
    nextDoc,
    previousDoc,
    nextDocUrl,
    previousDocUrl
  }
}
