import {
  STOP_MAIN_CONTAINER_SCROLL,
  stopMainContainerScroll,
  START_MAIN_CONTAINER_SCROLL,
  startMainContainerScroll,
  CHANGE_BACK_TO_CURRENT,
  changeBackToCurrent,
  CHANGE_SEARCH_PATTERN,
  changeSearchPattern
} from './actions';

import { RDXAppState } from './interfaces'

export const APP_INITIAL_STATE:RDXAppState = {
  testApp: 'app-testing',
  isMainContainerScrollable: true,
  backToCurrent: null,
  searchPattern: ''
}

export function appReducer(state:RDXAppState = APP_INITIAL_STATE, action):RDXAppState{
  switch(action.type){
    case STOP_MAIN_CONTAINER_SCROLL: return stopMainContainerScroll(state)
    case START_MAIN_CONTAINER_SCROLL: return startMainContainerScroll(state)
    case CHANGE_BACK_TO_CURRENT: return changeBackToCurrent(state, action.backToCurrent)
    case CHANGE_SEARCH_PATTERN: return changeSearchPattern(state, action.searchPattern)
    default:
      return state;
  }
}
