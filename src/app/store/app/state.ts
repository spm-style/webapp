import {
  // actions
  TEST_APP,

  // function-actions
  testApp
} from './actions';


export interface RDXAppState {
  testApp: string
}

export const APP_INITIAL_STATE:RDXAppState = {
  testApp: 'app-testing'
}

export function appReducer(state:RDXAppState = APP_INITIAL_STATE, action):RDXAppState{
  switch(action.type){
    case TEST_APP:
      return testApp(state);
    default:
      return state;
  }
}
