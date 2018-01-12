import {
  // actions
  STOP_MAIN_CONTAINER_SCROLL,
  START_MAIN_CONTAINER_SCROLL,
  // function-actions
  stopMainContainerScroll,
  startMainContainerScroll
} from './actions';


export interface RDXAppState {
  testApp: string,
  isMainContainerScrollable:boolean
}

export const APP_INITIAL_STATE:RDXAppState = {
  testApp: 'app-testing',
  isMainContainerScrollable: true
}

export function appReducer(state:RDXAppState = APP_INITIAL_STATE, action):RDXAppState{
  switch(action.type){
    case STOP_MAIN_CONTAINER_SCROLL: return stopMainContainerScroll(state)
    case START_MAIN_CONTAINER_SCROLL: return startMainContainerScroll(state)
    default:
      return state;
  }
}
