export interface RDXPackageOrigin {
  list: IPackageOrigin[],
  current: IPackageCurrent,
  currentPage: number,
  isFinish: boolean
}

export interface IResponsiveness { name: string, h: number, w: number, scale: number }

export interface IVariables { name: string, value: string }

export interface IClasses { name: string, variables: [IVariables] }

export interface IPackage {
  category: string,
  cdn: string,
  classes: [IClasses],
  createdAt: string,
  dependencies: [string],
  description: string,
  dom: { type: string, value: string },
  entry: string,
  keywords: [string],
  main: string,
  name: string,
  readme: string,
  responsiveness: [IResponsiveness],
  style: string,
  type: string,
  version: string
}

interface IContributors { id: string, login: string }

export interface IVersions { filename: string, name: string, package: string }

export interface IPackageOrigin {
  _id: string,
  author: string,
  distTags: { latest: IPackage, lts: IPackage },
  contributors: IContributors[],
  downloadTotal: number,
  license: string,
  name: string,
  preview: string,
  repository: string,
  site: string,
  stars: number,
  versions: any,
  views: number
}

export interface IPackageCurrent {
  _id: string,
  contributors: IContributors[],
  downloadTotal: number,
  license: string,
  repository: string,
  site: string,
  stars: number,
  versions: any,
  views: number,
  // in package
  category: string,
  cdn: string,
  classes: [IClasses],
  createdAt: string,
  dependencies: [string],
  description: string,
  dom: { type: string, value: string },
  entry: string,
  keywords: [string],
  main: string,
  name: string,
  readme: string,
  responsiveness: [IResponsiveness],
  style: string,
  type: string,
  version: string
}
