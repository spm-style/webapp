export const STOP_MAIN_CONTAINER_SCROLL = 'STOP_MAIN_CONTAINER_SCROLL';
export const START_MAIN_CONTAINER_SCROLL = 'START_MAIN_CONTAINER_SCROLL';

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
