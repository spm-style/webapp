export { IUser } from '../../service/api-user.service'

export interface RDXUser {
  authorPackages:any[],
  contributorPackages:any[],
  createdAt:Date,
  updatedAt:Date,
  email:string,
  login:string
}
