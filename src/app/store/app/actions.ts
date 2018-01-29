export const STOP_MAIN_CONTAINER_SCROLL = 'STOP_MAIN_CONTAINER_SCROLL';
export const START_MAIN_CONTAINER_SCROLL = 'START_MAIN_CONTAINER_SCROLL';
export const CHANGE_TAB_TITLE = 'CHANGE_TAB_TITLE'
export const CHANGE_BACK_TO_CURRENT = 'CHANGE_BACK_TO_CURRENT'

export let stopMainContainerScroll = (state) => {
  return {
    ...state,
    isMainContainerScrollable: false
  }
}

export let startMainContainerScroll = (state) => {
  return {
    ...state,
    isMainContainerScrollable: true
  }
}

export let changeTabTitle = (state, title) => {
	return {
		...state,
		title
	}
}

export let changeBackToCurrent = (state, backToCurrent) => {
  return {
    ...state,
    backToCurrent
  }
}
