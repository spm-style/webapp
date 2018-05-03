import { IPackageOrigin, RDXPackageOrigin, IPackageCurrent, IPackage } from './interfaces'
import { createPackageCurrent } from './methods'


export const FETCH_PACKAGE_ORIGIN = 'FETCH_PACKAGE_ORIGIN'
export const FETCH_CURRENT_PACKAGE_ORIGIN = 'FETCH_CURRENT_PACKAGE_ORIGIN'
export const CLEAR_CURRENT_PACKAGE = 'CLEAR_CURRENT_PACKAGE'
export const CHANGE_VERSION_CURRENT_PACKAGE = 'CHANGE_VERSION_CURRENT_PACKAGE'

export let fetchPackageOrigin = (state:RDXPackageOrigin, list:IPackageOrigin[]):RDXPackageOrigin => {
  return {
    ...state,
    list, // remove state.list.concat(list) => on ne concatène plus
    currentPage: 1,
    isFinish: true
  }
}

export let fetchCurrentPackageOrigin = (state: RDXPackageOrigin, packageOrigin:IPackageOrigin):RDXPackageOrigin => {
  return {
    ...state,
    current: createPackageCurrent(packageOrigin)
  }
}

export let clearCurrentPackage = (state: RDXPackageOrigin):RDXPackageOrigin => {
  return {
    ...state,
    current: null
  }
}

export let changeVersionCurrentPackage = (state: RDXPackageOrigin, packageNewVersion:IPackage):RDXPackageOrigin => {
  return {
    ...state,
    current: {
      ...state.current,
      category: packageNewVersion.category,
      cdn: packageNewVersion.cdn,
      classes: packageNewVersion.classes,
      sandbox: packageNewVersion.sandbox,
      createdAt: packageNewVersion.createdAt,
      dependencies: packageNewVersion.dependencies,
      description: packageNewVersion.description,
      dom: packageNewVersion.dom,
      files: packageNewVersion.files,
      keywords: packageNewVersion.keywords,
      mainClass: packageNewVersion.mainClass,
      js: packageNewVersion.js,
      name: packageNewVersion.name,
      readme: packageNewVersion.readme,
      responsiveness: packageNewVersion.responsiveness,
      style: packageNewVersion.style,
      type: packageNewVersion.type,
      version: packageNewVersion.version
    }
  }
}
