import {
  STOP_MAIN_CONTAINER_SCROLL,
  START_MAIN_CONTAINER_SCROLL,
  CHANGE_TAB_TITLE,
  stopMainContainerScroll,
  startMainContainerScroll,
  changeTabTitle
} from './actions';


export interface RDXAppState {
  testApp: string,
  isMainContainerScrollable:boolean,
  title:string
}

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
