import {
  CHANGE_MENU_NAVIGATION,
  OPEN_MENU,
  CLOSE_MENU,
  BACK_MENU_NAVIGATION,
  UPDATE_MENU_NAVIGATION,
  changeMenuNavigation,
  openMenu,
  closeMenu,
  backMenuNavigation,
  updateMenuNavigation
} from './actions';

export interface RDXNavigationState {
  isMenuOpen:boolean,
  currentActiveMenu:string,
  currentMenuBelow:string
}

export const NAVIGATION_INITIAL_STATE:RDXNavigationState = {
  isMenuOpen: false,
  currentActiveMenu: 'root',
  currentMenuBelow: ''
}

export function navigationReducer(state:RDXNavigationState = NAVIGATION_INITIAL_STATE, action):RDXNavigationState{
  switch(action.type){
    case CHANGE_MENU_NAVIGATION:
      return changeMenuNavigation(state, action.currentActiveMenu)
    case OPEN_MENU:
      return openMenu(state)
    case CLOSE_MENU:
      return closeMenu(state)
    case BACK_MENU_NAVIGATION:
      return backMenuNavigation(state, action.nameParentMenu)
    case UPDATE_MENU_NAVIGATION:
      return updateMenuNavigation(state, action.currentActiveMenu, action.currentMenuBelow)
    default:
      return state;
  }
}
