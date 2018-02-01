import { Injectable } from '@angular/core'
import { errorHttp,  URL_CDN, Observable, Http, Headers, Response } from './common'

export interface IStatus {
	message:boolean
}

@Injectable()
export class CdnStatusService {

  constructor(private _http:Http) { }

  public ping():Observable<IStatus>{
  	let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this._http.get(`${URL_CDN}/status/ping`, {headers: headers })
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }

}
