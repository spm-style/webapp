import {
  STOP_MAIN_CONTAINER_SCROLL,
  stopMainContainerScroll,
  START_MAIN_CONTAINER_SCROLL,
  startMainContainerScroll,
  CHANGE_TAB_TITLE,
  changeTabTitle
} from './actions';

import { RDXAppState } from './interfaces'

export const APP_INITIAL_STATE:RDXAppState = {
  testApp: 'app-testing',
  isMainContainerScrollable: true,
  title: 'home'
}

export function appReducer(state:RDXAppState = APP_INITIAL_STATE, action):RDXAppState{
  switch(action.type){
    case STOP_MAIN_CONTAINER_SCROLL: return stopMainContainerScroll(state)
    case START_MAIN_CONTAINER_SCROLL: return startMainContainerScroll(state)
    case CHANGE_TAB_TITLE: return changeTabTitle(state, action.title)
    default:
      return state;
  }
}
