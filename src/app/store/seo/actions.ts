import { config, ISeo } from '../../../seo_config'
import { RDXSeoState } from './interfaces'

export const FETCH_SEO_DATA = 'FETCH_SEO_DATA'

export let fetchSeoData = (state:RDXSeoState, pageName:string, opts:ISeo):RDXSeoState => {
  return {
    ...state,
    title: opts.title || config[pageName].title || state.title,
    keywords: opts.keywords || config[pageName].keywords || state.keywords,
    description: opts.description || config[pageName].description || state.description,
    canonical: opts.canonical || config[pageName].canonical || state.canonical
  }
}