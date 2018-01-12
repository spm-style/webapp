import { IUser, RDXUser } from './interfaces';

export const FETCH_USER = 'FETCH_USER'

export let fetchUser = (state:RDXUser, user:IUser):RDXUser => {
  return {
    ...state,
    authorPackages: user.authorPackages,
    contributorPackages: user.contributorPackages,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    login: user.login
  }
}
