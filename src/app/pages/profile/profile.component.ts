import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { ApiUserService, IUserResponse, IUser } from '../../service/api-user.service'
import { PopupService } from '../../modules/popup/popup.service'
import { LocalstorageService } from '../../service/localstorage.service'

import { NgRedux, RDXRootState, LOGOUT_USER, select, Observable, FETCH_PACKAGE_ORIGIN } from '../../store'

@Component({
  selector: 'spm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @select(['user']) readonly user:Observable<IUser>

	private _subPopup:Subscription
	private _subLogout:Subscription

  public emailValidationResend:boolean = false

  constructor(
  	private _apiUserService:ApiUserService,
  	private _popupService:PopupService,
  	private _router: Router,
  	private _redux:NgRedux<RDXRootState>,
  	private _localStorageService:LocalstorageService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  	if (this._subPopup) {
  		this._subPopup.unsubscribe()
  	}
  	if (this._subLogout) {
  		this._subLogout.unsubscribe()
  	}
  }

  public logout(){
  	this._subPopup = this._popupService.confirmation(
  		'log out',
      'Login out from spm',
      'Are you sure you want to log out from spm ?',
      '',
     	'',
      false).subscribe((data) => {
      	if (data) {
			  	this._subLogout = this._apiUserService.logout()
			  	.subscribe((data:any) => {
			  		this._localStorageService.logout()
			  		this._subLogout.unsubscribe()
			  		this._redux.dispatch({ type: LOGOUT_USER })
            this._redux.dispatch({ type: FETCH_PACKAGE_ORIGIN, list: [] })
			  		this._router.navigate([''])
			  	}, (error:any) => {
			  		this._localStorageService.logout()
			  		this._subLogout.unsubscribe()
			  		this._redux.dispatch({ type: LOGOUT_USER })
            this._redux.dispatch({ type: FETCH_PACKAGE_ORIGIN, list: [] })
			  		this._router.navigate([''])
			  	})
      	}
      	this._subPopup.unsubscribe()
    	})
  }

  public resendEmailValidation(){
    this._apiUserService.resendEmailValidation()
    .subscribe((response:{status:string}) => {
      if(response.status == "success") this.emailValidationResend = true
      setTimeout(() => { this.emailValidationResend = false }, 3000)
    }, (error:any) => {
      console.log("error on ProfileComponent => resendEmailValidation", error)
    })
  }
}
