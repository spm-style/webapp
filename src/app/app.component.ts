import { Component, OnInit } from '@angular/core';
import { NgRedux, RDXRootState, FETCH_USER, LOGOUT_USER, CHANGE_TAB_TITLE, RDXSeoState } from './store'
import { ApiUserService, IUserResponse } from './service/api-user.service'
import { LocalstorageService, USER_ID, USER_TOKEN_CONNECTION } from './service/localstorage.service'
import { Title, Meta } from '@angular/platform-browser'

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
    private _titleService:Title,
    private _metaService:Meta
  ){}

  ngOnInit(){
    this._redux.select(['seo'])
    .subscribe((data:RDXSeoState) => {
      this._titleService.setTitle(data.title)
      this._metaService.updateTag({name: 'description', content: data.description })
      this._metaService.updateTag({name: 'keywords', content: data.keywords })
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
