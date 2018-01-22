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
	state.currentPackage.contributors.push(user)
	return {
		...state
	}
}

export let removeCurrentPackageContributor = (state, login) => {
	for (let index = 0; index < state.currentPackage.contributors.length; index++) {
		if (state.currentPackage.contributors[index].login === login) {
			state.currentPackage.contributors.splice(index, 1)
		}
	}
	return {
		...state
	}
}

export let removeCurrentPackageVersion = (state, version) => {
	for (let index = 0; index < state.currentPackage.versions.length; index++) {
		if (state.currentPackage.versions[index].name == version) {
			state.currentPackage.versions.splice(index, 1)
		}
	}
	return {
		...state
	}
}
