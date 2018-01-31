import {
  FETCH_SEO_DATA,
  fetchSeoData
} from './actions';

import { RDXSeoState } from './interfaces'
import { environment } from '../../../environments/environment'

export const SEO_INITIAL_STATE:RDXSeoState = {
  title: 'spm, build up your design',
  keywords: 'custom, framework, design, workflow, prototype, spm',
  description: '',
  canonical: environment.wwwUrl,
  shortTitle: 'spm',
  image: `${environment.wwwUrl}/assets/logo.svg`,
  twitterCard: 'summary'
}

export function seoReducer(state:RDXSeoState = SEO_INITIAL_STATE, action):RDXSeoState{
  switch(action.type){
    case FETCH_SEO_DATA: return fetchSeoData(state, action.pageName, action.opts || {})
    default:
      return state;
  }
}
