export { IUser } from '../../service/api-user.service'

export interface RDXUser {
  _id:string,
  authorPackages:any[],
  contributorPackages:any[],
  packages:any[],
  favorites: any[],
  createdAt:Date,
  updatedAt:Date,
  email:string,
  login:string,
  publicName:string,
  publicEmail:string,
  description:string,
  url:string,
  company:string,
  location:string,
  picture:string
}
