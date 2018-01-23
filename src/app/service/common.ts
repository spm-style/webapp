import { Observable } from 'rxjs/Rx'

export let errorHttp = (error: any):Observable<any> => {
  return Observable.throw(error.json().message)
}

export { Observable } from 'rxjs/Observable'
export { Http, Headers, Response } from '@angular/http'
export const URL_API = 'https://api.spm-style.com'
