import { config, ISeo } from '../../../seo_config'
import { RDXSeoState } from './interfaces'

export const FETCH_SEO_DATA = 'FETCH_SEO_DATA'

export let fetchSeoData = (state:RDXSeoState, pageName:string, opts:ISeo):RDXSeoState => {
  return {
    ...state,
    title: opts.title || (config[pageName] ? config[pageName].title || state.title : state.title),
    keywords: opts.keywords || (config[pageName] ? config[pageName].keywords || state.keywords : state.keywords),
    description: opts.description || (config[pageName] ? config[pageName].description || state.description : state.description),
    canonical: opts.canonical || (config[pageName] ? config[pageName].canonical || state.canonical : state.canonical),
    shortTitle: opts.shortTitle || (config[pageName] ? config[pageName].shortTitle || state.shortTitle : state.shortTitle),
	  image: opts.image || (config[pageName] ? config[pageName].image || state.image : state.image),
	  twitterCard: opts.twitterCard || (config[pageName] ? config[pageName].twitterCard || state.twitterCard : state.twitterCard)
  }
}