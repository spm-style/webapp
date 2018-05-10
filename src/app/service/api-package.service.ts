import { Injectable } from '@angular/core'
import { errorHttp,  URL_API, Observable, Http, Headers, Response } from './common'
import { LocalstorageService } from './localstorage.service'

@Injectable()
export class ApiPackageService {

  private _headers:Headers

  constructor(
    private _http:Http,
    private _localStorageService:LocalstorageService
  ){
    this._headers = new Headers()
    this._headers.append('Content-Type', 'application/json')
  }

  public changeVersionInCurrentPackage(packageId:string):Observable<any> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${this._localStorageService.getLoginInfos().token}`)
    return this._http.get(`${URL_API}/package/id/${packageId}`, {headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }

}
