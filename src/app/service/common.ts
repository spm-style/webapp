import { Observable } from 'rxjs/Rx'
import { environment } from '../../environments/environment'

export let errorHttp = (error: any):Observable<any> => {
  return Observable.throw(error.message)
}

export { Observable } from 'rxjs/Observable'
export { Http, Headers, Response } from '@angular/http'
export const URL_API = environment.apiUrl
export const URL_CDN = environment.cdnUrl
