import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux, RDXRootState, RDXUser, FETCH_SEO_DATA, FETCH_USER } from '../../../../store'
import { ApiUserService, IUser } from '../../../../service/api-user.service'
import { Subscription } from 'rxjs/Subscription'
import { environment } from '../../../../../environments/environment'

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


    this._user = this._redux.getState().user
    this.username = this._user.login

    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'profilePublic',
      opts: {
        title: `${this._user.login} profile - spm, build up your design`,
        keywords: `${this._user.login}, profile, user, public, design, style, spm`,
        description: `${this._user.login} public profile for spm, style package manager and registry`,
        canonical: `${environment.wwwUrl}/profile/public`,
        shortTitle: `${this._user.login} - spm`,
        image: `${environment.wwwUrl}/assets/profile.svg`,
        twitterCard: 'summary'
      }
    })

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
