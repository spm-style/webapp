import { Injectable } from '@angular/core';
import { errorHttp,  URL_API, Observable, Http, Headers, Response } from './common'

@Injectable()
export class ApiUserService {

  private _headers:Headers

  constructor(private _http:Http){
    this._headers = new Headers()
    this._headers.append('Content-Type', 'application/json')
  }

  public getPackages(search:string):Observable<any> {
    return this._http.get(`${URL_API}/user/test/packages${search === '' ? '' : '?search=' + search}`, {
      headers: this._headers
      // withCredentials: true
    })
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }

  public modifyUserData(payload):Observable<any> {
  	let body = JSON.stringify(payload)
  	return this._http.post(`${URL_API}/user`, body, {headers: this._headers, withCredentials: true})
  	.map((res:Response) => res.json())
  	.catch(errorHttp)
  }
}
