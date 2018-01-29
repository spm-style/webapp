import {
  FETCH_SEO_DATA,
  fetchSeoData
} from './actions';

import { RDXSeoState } from './interfaces'

export const SEO_INITIAL_STATE:RDXSeoState = {
  title: 'spm',
  keywords: '',
  description: '',
  canonical: 'https://www.spm-style.com'
}

export function seoReducer(state:RDXSeoState = SEO_INITIAL_STATE, action):RDXSeoState{
  switch(action.type){
    case FETCH_SEO_DATA: return fetchSeoData(state, action.pageName, action.opts || {})
    default:
      return state;
  }
}
