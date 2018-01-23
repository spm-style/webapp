import {
  CHANGE_CURRENT_DOC,
  changeCurrentDoc
} from './actions';

import { RDXDocState } from './interfaces'

export const DOC_INITIAL_STATE:RDXDocState = {
  currentDoc: '',
  currentFragment: '',
  nextDoc: '',
  previousDoc: '',
  nextDocUrl: '',
  previousDocUrl: ''
}

export function docReducer(state:RDXDocState = DOC_INITIAL_STATE, action):RDXDocState{
  switch(action.type){
    case CHANGE_CURRENT_DOC:
      return changeCurrentDoc(state, action.currentDoc, action.nextDoc, action.previousDoc, action.nextDocUrl, action.previousDocUrl);
    default:
      return state;
  }
}
