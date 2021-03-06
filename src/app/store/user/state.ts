import {
  FETCH_USER,
  fetchUser,
  LOGOUT_USER,
  logoutUser,
  ADD_FAVORITE,
  addFavorite,
  REMOVE_FAVORITE,
  removeFavorite
} from './actions';

import { RDXUser } from './interfaces'

export const USER_INITIAL_STATE:RDXUser = {
  _id:null,
  authorPackages: [],
  contributorPackages: [],
  packages: [],
  favorites: [],
  createdAt: null,
  updatedAt: null,
  email: null,
  login: null,
  publicName:null,
  publicEmail:null,
  description:null,
  url:null,
  company:null,
  location:null,
  picture:null,
  validationEmail: null
}

export function userReducer(state:RDXUser = USER_INITIAL_STATE, action):RDXUser{
  switch(action.type){
    case FETCH_USER: return fetchUser(state, action.user)
    case LOGOUT_USER: return logoutUser(state)
    case ADD_FAVORITE: return addFavorite(state, action.favorite)
    case REMOVE_FAVORITE: return removeFavorite(state, action.favorite)
    default: return state
  }
}
