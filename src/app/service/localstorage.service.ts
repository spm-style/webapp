import { Injectable } from '@angular/core';

export const USER_TOKEN_CONNECTION = 'hxa398hanx8j9z3n9mz3'
export const USER_ID = 'kajb39839mz09mxsndz0m'

@Injectable()
export class LocalstorageService {

  constructor() { }

  public logout(){
  	localStorage.removeItem(USER_TOKEN_CONNECTION)
  	localStorage.removeItem(USER_ID)
  }

  public login(token:string, id:string){
  	localStorage.setItem(USER_TOKEN_CONNECTION, token)
  	localStorage.setItem(USER_ID, id)
  }

  public isLogged():boolean {
  	return (localStorage.getItem(USER_TOKEN_CONNECTION) !== null && localStorage.getItem(USER_ID) !== null)
  }

  public getLoginInfos():any {
    return { token: localStorage.getItem(USER_TOKEN_CONNECTION), id: localStorage.getItem(USER_ID) }
  }

}
