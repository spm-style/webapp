import {
  CHANGE_MENU_NAVIGATION,
  OPEN_MENU,
  CLOSE_MENU,
  BACK_MENU_NAVIGATION,
  changeMenuNavigation,
  openMenu,
  closeMenu,
  backMenuNavigation
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
    default:
      return state;
  }
}
