import { Component, OnInit } from '@angular/core';

import { NgRedux, RDXRootState, FETCH_USER } from './store'
import { ApiUserService, USER_ID, USER_TOKEN_CONNECTION, IUserResponse } from './service/api-user.service'

@Component({
  selector: 'spm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _apiUser:ApiUserService,
    private _redux:NgRedux<RDXRootState>
  ){}

  ngOnInit(){
    if(localStorage.getItem(USER_ID) && localStorage.getItem(USER_TOKEN_CONNECTION)){
      this._apiUser.getUserById(localStorage.getItem(USER_ID), localStorage.getItem(USER_TOKEN_CONNECTION))
      .subscribe((response:IUserResponse) => {
        this._redux.dispatch({ type: FETCH_USER, user: response })
      }, (error:any) => {
        console.log(error)
      })
    }
  }
}
