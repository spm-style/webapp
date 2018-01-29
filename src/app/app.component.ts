import { Component, OnInit } from '@angular/core';
import { NgRedux, RDXRootState, FETCH_USER, LOGOUT_USER, CHANGE_TAB_TITLE } from './store'
import { ApiUserService, IUserResponse } from './service/api-user.service'
import { LocalstorageService, USER_ID, USER_TOKEN_CONNECTION } from './service/localstorage.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'spm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _apiUser:ApiUserService,
    private _redux:NgRedux<RDXRootState>,
    private _localStorageService:LocalstorageService,
    private _titleService:Title
  ){}

  ngOnInit(){
    this._redux.select(['app', 'title'])
    .subscribe((data:string) => {
      this._titleService.setTitle(data)
    })
    //besoin d'un ondestroy pour un subscribe global ?
    if(this._localStorageService.isLogged()){
      this._apiUser.getUserById()
      .subscribe((response:IUserResponse) => {
        this._redux.dispatch({ type: FETCH_USER, user: response })
      }, (error:any) => {
        this._localStorageService.logout()
        this._redux.dispatch({ type: LOGOUT_USER })
      })
    } else {
      this._localStorageService.logout()
        this._redux.dispatch({ type: LOGOUT_USER })
    }
  }
}
