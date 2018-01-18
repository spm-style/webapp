import { Injectable } from '@angular/core';
import { errorHttp,  URL_API, Observable, Http, Headers, Response } from './common'
import { LocalstorageService } from './localstorage.service'

export interface IRegisterPayload {
  login:string,
  email:string,
  password:string,
  mailing:boolean
}

export interface ILoginPayload {
  login:string,
  password:string
}

export interface IUser {
  authorPackages:any[],
  contributorPackages:any[],
  packages:any[],
  favorites:any[],
  createdAt:Date,
  updatedAt:Date,
  email:string,
  _id:string,
  login:string,
  publicName:string,
  publicEmail:string,
  description:string,
  url:string,
  company:string,
  location:string,
  picture:string
}

export interface IUserResponse {
  token:string,
  user:IUser
}

@Injectable()
export class ApiUserService {

  private _headers:Headers

  constructor(
    private _http:Http,
    private _localStorageService:LocalstorageService
    ){
    this._headers = new Headers()
    this._headers.append('Content-Type', 'application/json')
  }

  public register(payload:IRegisterPayload):Observable<IUserResponse> {
    return this._http.put(`${URL_API}/user`, JSON.stringify(payload), {headers: this._headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }

  public login(payload:ILoginPayload):Observable<IUserResponse> {
     return this._http.post(`${URL_API}/user`, JSON.stringify(payload), {headers: this._headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }

  public updateUserData(payload:any):Observable<IUser> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append("Authorization", `Bearer ${this._localStorageService.getLoginInfos().token}`)
  	return this._http.post(`${URL_API}/user/${this._localStorageService.getLoginInfos().id}`, payload, {headers, withCredentials: true})
  	.map((res:Response) => res.json())
  	.catch(errorHttp)
  }

  // public updateUserAuth(payload:any):Observable<IUserResponse> {
  //   let headers = new Headers()
  //   headers.append('Content-Type', 'application/json')
  //   return this._http.post(`${URL_API}/user/${this._localStorageService.getLoginInfos().id}/credentials`, payload, {headers, withCredentials: true})
  //   .map((res:Response) => res.json())
  //   .catch(errorHttp)
  // }

  public getUserById():Observable<IUserResponse> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append("Authorization", `Bearer ${this._localStorageService.getLoginInfos().token}`)
    return this._http.get(`${URL_API}/user/${this._localStorageService.getLoginInfos().id}`, {headers: headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }

  public getUserByName(name:string):Observable<IUser> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this._http.get(`${URL_API}/user/profile/${name}`, {headers: headers, withCredentials: true})
    .map((res:Response) => res.json().user)
    .do((data:IUser) => data.packages = data.authorPackages.concat(data.contributorPackages))
    .catch(errorHttp);
  }

  public logout():Observable<IUserResponse> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append("Authorization", `Bearer ${this._localStorageService.getLoginInfos().token}`)
    return this._http.post(`${URL_API}/user/logout`, null, { headers: headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp)
  }

  public favorites(id:string, action:string):Observable<boolean> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append("Authorization", `Bearer ${this._localStorageService.getLoginInfos().token}`)
    return this._http.post(`${URL_API}/user/favorites/${action}`, { id }, { headers: headers, withCredentials: true})
    .map((res:Response) => res.json().statusCode === 200)
    .catch(errorHttp)
  }
}
