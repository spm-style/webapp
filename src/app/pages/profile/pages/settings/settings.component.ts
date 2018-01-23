import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE, FETCH_USER, Subscription } from '../../../../store'
import { ApiUserService, IUserResponse } from '../../../../service/api-user.service'
import { LocalstorageService } from '../../../../service/localstorage.service'

@Component({
  selector: 'spm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

	public formSettings:FormGroup
  public responseRequest:string
  public classResponseRequest:string
  private _subUser:Subscription

  constructor(
    private _formBuilder:FormBuilder,
    private _redux:NgRedux<RDXRootState>,
    private _apiUser:ApiUserService,
    private _localStorageService:LocalstorageService
  ) { }

  ngOnInit() {
    this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'settings' })

  	this.formSettings = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordRepeat: ['', [Validators.required]]
    })
  }

  ngOnDestroy(){
    if (this._subUser) { this._subUser.unsubscribe() }
  }

  public onSubmitContact() {
    let login = this._redux.getState().user.login
    this._subUser = this._apiUser.updateUserCredentials({
      login,
      password: this.formSettings.value.oldpassword,
      newPassword: this.formSettings.value.newPassword})
    .subscribe((data:IUserResponse) => {
      this._localStorageService.login(data.token, data.user._id)
      this._redux.dispatch({ type: FETCH_USER, user: data.user })
      this.responseRequest = 'password successfully updated'
      this.classResponseRequest = 'success-request'
    }, (err:any) => {
      this.responseRequest = err
      this.classResponseRequest = 'error-request'
    })
  }
}
