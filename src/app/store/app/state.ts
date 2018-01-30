import {
  STOP_MAIN_CONTAINER_SCROLL,
  stopMainContainerScroll,
  START_MAIN_CONTAINER_SCROLL,
  startMainContainerScroll,
  CHANGE_BACK_TO_CURRENT,
  changeBackToCurrent
} from './actions';

import { RDXAppState } from './interfaces'

export const APP_INITIAL_STATE:RDXAppState = {
  testApp: 'app-testing',
  isMainContainerScrollable: true,
  backToCurrent: null
}

export function appReducer(state:RDXAppState = APP_INITIAL_STATE, action):RDXAppState{
  switch(action.type){
    case STOP_MAIN_CONTAINER_SCROLL: return stopMainContainerScroll(state)
    case START_MAIN_CONTAINER_SCROLL: return startMainContainerScroll(state)
    case CHANGE_BACK_TO_CURRENT: return changeBackToCurrent(state, action.backToCurrent)
    default:
      return state;
  }
}
