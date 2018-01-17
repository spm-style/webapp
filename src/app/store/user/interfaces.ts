export { IUser } from '../../service/api-user.service'

export interface RDXUser {
  authorPackages:any[],
  contributorPackages:any[],
  packages:any[],
  favorites: any[],
  createdAt:Date,
  updatedAt:Date,
  email:string,
  login:string
}
