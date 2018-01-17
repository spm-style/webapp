import { IUser, RDXUser, } from './interfaces';

export const FETCH_USER = 'FETCH_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export let fetchUser = (state:RDXUser, user:IUser):RDXUser => {
  return {
    ...state,
    authorPackages: user.authorPackages,
    contributorPackages: user.contributorPackages,
    packages: user.authorPackages.concat(user.contributorPackages),
    favorites: user.favorites,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    login: user.login
  }
}

export let logoutUser = (state:RDXUser):RDXUser => {
  return {
      ...state,
      authorPackages: [],
      contributorPackages: [],
      packages: [],
      favorites: [],
      createdAt: null,
      updatedAt: null,
      email: null,
      login: null
  }
}

export let addFavorite = (state:RDXUser, favorite:string) => {
  if (!state.favorites.includes(favorite)) { state.favorites.push(favorite) }
  return {
    ...state
  }
}

export let removeFavorite = (state:RDXUser, favorite:string) => {
  if (state.favorites.includes(favorite)) { state.favorites.splice(state.favorites.indexOf(favorite), 1) }
  return {
    ...state
  }
}
