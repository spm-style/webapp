export interface IVersion {
  name:string,
  createdAt:Date,
  latest:boolean
}

export interface IAdminPackage {
  name:string,
  createdAt:Date,
  lastUpdateAt:Date,
  lastDownloadAt:Date,
  contributors:string[],
  versions:IVersion[],
  stars:number,
  downloads:number
}

export interface RDXAdminState {
  currentPackage:IAdminPackage
}