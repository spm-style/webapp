export const CHANGE_MENU_NAVIGATION = 'CHANGE_NAVIGATION';
export const OPEN_MENU = 'OPEN_MENU';
export const CLOSE_MENU = 'CLOSE_MENU';
export const BACK_MENU_NAVIGATION = 'BACK_MENU_NAVIGATION';
export const UPDATE_MENU_NAVIGATION = 'UPDATE_MENU_NAVIGATION';

export let changeMenuNavigation = (state, currentActiveMenu) => {
  return {
    ...state,
    currentActiveMenu,
    currentMenuBelow: state.currentActiveMenu
  }
}

export let openMenu = (state) => {
	return {
		...state,
		isMenuOpen: true
	}
}

export let closeMenu = (state) => {
	return {
		...state,
		isMenuOpen: false
	}
}

export let backMenuNavigation = (state, nameParentMenu) => {
	return {
		...state,
		currentActiveMenu: state.currentMenuBelow,
		currentMenuBelow: nameParentMenu
	}
}

export let updateMenuNavigation = (state, currentActiveMenu, currentMenuBelow) => {
	return {
		...state,
		currentActiveMenu,
		currentMenuBelow
	}
}
