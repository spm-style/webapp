import { Observable } from 'rxjs/Rx'
import { environment } from '../../environments/environment'

export let errorHttp = (error: any):Observable<any> => {
  console.log(error)
  return Observable.throw(error.json())
}

export { Observable } from 'rxjs/Observable'
export { Http, Headers, Response } from '@angular/http'
export const URL_API = environment.apiUrl
export const URL_CDN = environment.cdnUrl
