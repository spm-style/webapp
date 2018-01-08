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
  currentMenuBelow:string,
  parentMenuMapping:object
}

export const NAVIGATION_INITIAL_STATE:RDXNavigationState = {
  isMenuOpen: false,
  currentActiveMenu: 'root-expanded',
  currentMenuBelow: '',
  parentMenuMapping: {
    "documentation-expanded": "root-expanded",
    "install-expanded": "documentation-expanded"
  }
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
      return backMenuNavigation(state)
    default:
      return state;
  }
}
