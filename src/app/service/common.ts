import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

export let errorHttp = (error: any):Observable<any> => {
  return Observable.throw(error.json().message);
}

export const URL_API = 'http://api.spm-style.com'
export { Observable } from 'rxjs/Observable';
export { Http, Headers, Response } from '@angular/http';


// import 'rxjs/add/operator/do';
// headers.append('x-auth-web', `bearer ${this._redux.getState().app.tokenClient}`);
