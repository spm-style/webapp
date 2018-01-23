import { IUser } from '../../service/api-user.service'

import { RDXUser, } from './interfaces';

export const FETCH_USER = 'FETCH_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export let fetchUser = (state:RDXUser, user:IUser):RDXUser => {
  return {
    ...state,
    _id: user._id,
    authorPackages: user.authorPackages,
    contributorPackages: user.contributorPackages,
    packages: user.authorPackages.concat(user.contributorPackages),
    favorites: user.favorites,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    login: user.login,
    publicName:user.publicName,
    publicEmail:user.publicEmail,
    description:user.description,
    url:user.url,
    company:user.company,
    location:user.location,
    picture:user.picture
  }
}

export let logoutUser = (state:RDXUser):RDXUser => {
  return {
      ...state,
      _id: null,
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
      picture:null
  }
}

export let addFavorite = (state:RDXUser, favorite:string):RDXUser => {
  return {
    ...state,
    favorites: [...state.favorites, favorite]
  }
}

export let removeFavorite = (state:RDXUser, favorite:string):RDXUser => {
  return {
    ...state,
    favorites: state.favorites.filter((item) => item != favorite)
  }
}
