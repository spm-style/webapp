import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



export const USER_TOKEN_CONNECTION = 'hxa398hanx8j9z3n9mz3'
export const USER_ID = 'kajb39839mz09mxsndz0m'

@Injectable()
export class LocalstorageService implements OnInit {

  private _localStorage:any

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) { this._localStorage = localStorage }
  }

  ngOnInit(){
    console.log('onInit', this._localStorage)
  }

  public logout(){
    if (isPlatformBrowser(this.platformId)) {
    	this._localStorage.removeItem(USER_TOKEN_CONNECTION)
    	this._localStorage.removeItem(USER_ID)
    }
  }

  public login(token:string, id:string){
    if (isPlatformBrowser(this.platformId)) {
    	this._localStorage.setItem(USER_TOKEN_CONNECTION, token)
    	this._localStorage.setItem(USER_ID, id)
    }
  }

  public isLogged():boolean {
  	return (isPlatformBrowser(this.platformId))
      ? (this._localStorage.getItem(USER_TOKEN_CONNECTION) !== null && this._localStorage.getItem(USER_ID) !== null)
      : false
  }

  public getLoginInfos():any {
    return (isPlatformBrowser(this.platformId))
    ? { token: this._localStorage.getItem(USER_TOKEN_CONNECTION), id: this._localStorage.getItem(USER_ID) }
    : { token: null, id: null }
  }

}
