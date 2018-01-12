import { Injectable } from '@angular/core';
import { errorHttp,  URL_API, Observable, Http, Headers, Response } from './common'

export const USER_TOKEN_CONNECTION = 'hxa398hanx8j9z3n9mz3'
export const USER_ID = 'kajb39839mz09mxsndz0m'

export interface IRegisterPayload {
  login:string,
  email:string,
  password:string,
  mailing:boolean
}

export interface IUser {
  authorPackages:any[],
  contributorPackages:any[],
  createdAt:Date,
  updatedAt:Date,
  email:string,
  _id:string,
  login:string
}

export interface IUserResponse {
  token:string,
  user:IUser
}

@Injectable()
export class ApiUserService {

  private _headers:Headers

  constructor(private _http:Http){
    this._headers = new Headers()
    this._headers.append('Content-Type', 'application/json')
  }

  // public getPackages(search:string):Observable<any> {
  //   return this._http.get(`${URL_API}/user/test/packages${search === '' ? '' : '?search=' + search}`, {
  //     headers: this._headers
  //     // withCredentials: true
  //   })
  //   .map((res:Response) => res.json())
  //   .catch(errorHttp);
  // }

  // public getUser(payload):Observable<any> {
  //   return this._http.get(`${URL_API}/package-origin`, {headers: this._headers, withCredentials: true})
  //   .map((res:Response) => res.json())
  //   .catch(errorHttp);
  // }

  public register(payload:IRegisterPayload):Observable<IUserResponse> {
    return this._http.put(`${URL_API}/user`, JSON.stringify(payload), {headers: this._headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }
//   public modifyUserData(payload):Observable<any> {
//   	let body = JSON.stringify(payload)
//   	return this._http.post(`${URL_API}/user`, body, {headers: this._headers, withCredentials: true})
//   	.map((res:Response) => res.json())
//   	.catch(errorHttp)
//   }
// }
  public getUserById(id:string, token:string):Observable<IUserResponse> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append("Authorization", `Bearer ${token}`)
    return this._http.get(`${URL_API}/user/${id}`, {headers: headers, withCredentials: true})
    .map((res:Response) => res.json())
    .catch(errorHttp);
  }

}
