import { Injectable } from '@angular/core';
import { errorHttp,  URL_API, Observable, Http, Headers, Response } from './common'
import 'rxjs/add/operator/do';

let breakpoints = {
  watch: {name: 'watch', w: 272, h: 340, scale: 1 },
  mobile: { name: 'mobile', w: 320, h: 568, scale: 1 },
  phablet: { name: 'phablet', w: 414, h: 736, scale: 1 },
  tablet: { name: 'tablet', w: 768, h: 1024, scale: 0.75 },
  laptop: { name: 'laptop', w: 1024, h: 856, scale: 0.3 },
  screenXl: { name: 'screenXl', w: 1200, h: 900, scale: 0.3 }
}

@Injectable()
export class ApiPackageOriginService {

  private _headers:Headers

  constructor(private _http:Http){
    this._headers = new Headers()
    this._headers.append('Content-Type', 'application/json')
  }

  public listPackageOrigin():Observable<any> {
    return this._http.get(`${URL_API}/package-origin`, {headers: this._headers, withCredentials: true})
    .map((res:Response) => res.json())
    .do((res:any) => {
      for(let packageOrigin of res.packages){
        packageOrigin.distTags.latest.responsiveness = packageOrigin.distTags.latest.responsiveness.map((name:string) => breakpoints[name])
      }
      return res
    })
    .catch(errorHttp);
  }

  public packageOrigin(name:string):Observable<any> {
    return this._http.get(`${URL_API}/package-origin/name/${name}`, {headers: this._headers, withCredentials: true})
    .map((res:Response) => res.json())
    .do((res:any) => {
      res.distTags.latest.responsiveness = res.distTags.latest.responsiveness.map((name:string) => breakpoints[name])
      return res
    })
    .catch(errorHttp);
  }

  public updateContributors(action:string, targetPackage:string, login:string):Observable<any> {
    //ATTENTION//
    this._headers.append('Authorization', `bearer ${'    blablabla   '}`)
    //ATTENTION//
    return this._http.post(`${URL_API}/package-origin/${targetPackage}/contributors/${action}`, {headers: this._headers, withCredentials: true, body: {login}})
    .map((res:Response) => res.json())
    .do((res:any) => {
      return res
    })
    .catch(errorHttp)
  }

  // public updateFavorite(action:string, targetPackage:string)

}
