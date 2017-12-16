import { Observable } from 'rxjs/Rx';

export let errorHttp = (error: any):Observable<any> => {
  return Observable.throw(error.json().message);
}

export const URL_API = 'https://api.spm-style.com'
