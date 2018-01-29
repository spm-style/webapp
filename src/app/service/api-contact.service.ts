import { Injectable } from '@angular/core';
import { errorHttp,  URL_API, Observable, Http, Headers, Response } from './common'

interface IContact {
  email: string,
  question: string,
  content: string
}

@Injectable()
export class ApiContactService {

  private _headers:Headers

  constructor(private _http:Http){
    this._headers = new Headers()
    this._headers.append('Content-Type', 'application/json')
  }

  public sendContact(payload:IContact):Observable<any> {
     return this._http.put(`${URL_API}/contact`, payload, {headers: this._headers, withCredentials: true})
     .map((res:Response) => res.json())
     .catch(errorHttp);
  }
}
