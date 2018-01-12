import {
  FETCH_USER,
  fetchUser
} from './actions';

import {
  RDXUser
} from './interfaces'


export const USER_INITIAL_STATE:RDXUser = {
  authorPackages: [],
  contributorPackages: [],
  createdAt: null,
  updatedAt: null,
  email: null,
  login: null
}

export function userReducer(state:RDXUser = USER_INITIAL_STATE, action):RDXUser{
  switch(action.type){
    case FETCH_USER: return fetchUser(state, action.user)
    default: return state
  }
}
