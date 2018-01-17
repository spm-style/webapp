

export interface RDXPackageOrigin {
  list: IPackageOrigin[],
  currentInList: any,
  current: IPackageOrigin,
  currentPage: number,
  isFinish: boolean
}

export interface IResponsiveness { name: string, h: number, w: number, scale: number }

export interface IVariables { name: string, value: string }

export interface IClasses { name: string, variables: [IVariables] }

export interface Ipackage {
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

interface IVersions { filename: string, name: string, package: string }

export interface IPackageOrigin {
  _id: string,
  author: string,
  distTags: { latest: Ipackage, lts: Ipackage },
  contributors: IContributors[],
  downloadTotal: number,
  license: string,
  name: string,
  repository: string,
  site: string,
  versions: IVersions[] | Ipackage[]
}
