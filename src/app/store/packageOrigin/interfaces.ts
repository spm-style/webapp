export interface RDXPackageOrigin {
  list: IPackageOrigin[],
  current: IPackageCurrent,
  currentPage: number,
  isFinish: boolean
}

export interface IResponsiveness { name: string, h: number, w: number, scale: number }

export interface IVariables { name: string, value: string }

export interface IInstanceVariables { name: string, value: string, type: string }

export interface IExportVariables { name: string, type: string }

export interface IClasses { name: string, variables: [IVariables], js: boolean }

export interface IPackage {
  category: string,
  cdn: string,
  classes: [IClasses],
  sandbox: { defaultClasses: string[] },
  createdAt: string,
  dependencies: [string],
  description: string,
  dom: { type: string, value: string },
  files: { style: string, script: string},
  keywords: [string],
  mainClass: string,
  js: { instancesVar: [IInstanceVariables], exportsVar: [IExportVariables]},
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
  preview:string,
  // in package
  category: string,
  cdn: string,
  classes: [IClasses],
  sandbox: { defaultClasses: string[] },
  createdAt: string,
  dependencies: [string],
  description: string,
  dom: { type: string, value: string },
  files: { style: string, script: string},
  keywords: [string],
  mainClass: string,
  js: { instancesVar: [IInstanceVariables], exportsVar: [IExportVariables]},
  name: string,
  readme: string,
  responsiveness: [IResponsiveness],
  style: string,
  type: string,
  version: string
}
