import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { errorHttp,  URL_API} from './common'

@Injectable()
export class ApiContactService {

  constructor(private _http:Http){}

  public sendContact = (payload):Observable<any> => {
    let headers = new Headers();
    console.log(payload)
    headers.append('Content-Type', 'application/json');
    // headers.append('x-auth-web', `bearer ${this._redux.getState().app.tokenClient}`);
    return this._http.put(`${URL_API}/contact`, JSON.stringify(payload), {headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }
}
