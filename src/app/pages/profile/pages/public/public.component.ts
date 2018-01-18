import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux, RDXRootState, RDXUser, IUser, CHANGE_TAB_TITLE, FETCH_USER } from '../../../../store'
import { ApiUserService } from '../../../../service/api-user.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'spm-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit, OnDestroy {
	  
	public formPublicProfile:FormGroup
  public username:string
  public responseRequest:string
  public classResponseRequest:any

  private _user:RDXUser
  private _subUser:Subscription

  constructor(
    private _formBuilder:FormBuilder,
    private _redux:NgRedux<RDXRootState>,
    private _apiUser:ApiUserService
  ) { }

  ngOnInit() {

    this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'public profile' })

    this._user = this._redux.getState().user
    this.username = this._user.login

  	this.formPublicProfile = this._formBuilder.group({
      publicName: [this._user.publicName || '', []],
      publicEmail: [this._user.publicEmail || '', [Validators.email]],
      description: [this._user.description || '', []],
      url: [this._user.url || '', []],
      company: [this._user.company || '', []],
      location: [this._user.location || '', []]
    })
  }

  ngOnDestroy() {
    if (this._subUser) { this._subUser.unsubscribe() }
  }

  public onSubmitContact() {
    let payload = {}
    for (let key in this.formPublicProfile.value) {
      if ((this._user[key] && this.formPublicProfile.value[key] !== this._user[key]) ||
        (!this._user[key] && this.formPublicProfile.value[key] !== '')) {
        payload[key] = this.formPublicProfile.value[key]
      }
    }
    this._subUser = this._apiUser.updateUserData(payload).subscribe((data:IUser) => {
      this._redux.dispatch({ type: FETCH_USER, user: data })
      this.classResponseRequest = 'success-request'
      this.responseRequest = 'successful update'
    }, (error:any) => {
      this.classResponseRequest = 'error-request'
      this.responseRequest = error
    })
  }

}
