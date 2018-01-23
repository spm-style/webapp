export const CHANGE_CURRENT_PACKAGE = 'CHANGE_CURRENT_PACKAGE'
export const ADD_CURRENT_PACKAGE_CONTRIBUTOR = 'ADD_CURRENT_PACKAGE_CONTRIBUTOR'
export const REMOVE_CURRENT_PACKAGE_CONTRIBUTOR = 'REMOVE_CURRENT_PACKAGE_CONTRIBUTOR'
export const REMOVE_CURRENT_PACKAGE_VERSION = 'REMOVE_CURRENT_PACKAGE_VERSION'

export let changeCurrentPackage = (state, currentPackage) => {
  return {
    ...state,
    currentPackage
  }
}

export let addCurrentPackageContributor = (state, user) => {
	return {
		...state,
		currentPackage: {
			...state.currentPackage,
			contributors: [...state.currentPackage.contributors, user]
		}
	}
}

export let removeCurrentPackageContributor = (state, login) => {
	return {
		...state,
		currentPackage: {
			...state.currentPackage,
			contributors: state.currentPackage.contributors.filter(data => data.login !== login)
		}
	}
}

export let removeCurrentPackageVersion = (state, version) => {
	return {
		...state,
		currentPackage: {
			...state.currentPackage,
			versions: state.currentPackage.versions.filter(data => data.name !== version)
		}
	}
}
