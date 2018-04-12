import { Component, OnInit, OnDestroy } from '@angular/core'
import { ApiUserService, IUserResponse } from '../../service/api-user.service'
import { NgRedux, RDXRootState, RDXUser, FETCH_SEO_DATA, FETCH_USER } from '../../store'
import { LocalstorageService } from '../../service/localstorage.service'
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'spm-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit, OnDestroy {

	public accountVerificationToken:String
  public authorizedStep:Boolean
  private _subUser:Subscription

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _apiUser:ApiUserService,
    private _localStorageService:LocalstorageService
  ) { }

  ngOnInit() {
  	this._activatedRoute.queryParams.subscribe((data:any) => {
  		this._subUser = this._apiUser.verifyAccount(data.token).subscribe(
        (user:IUserResponse) => {
          this.authorizedStep = true
          this._redux.dispatch({ type: FETCH_USER, user })
          this._localStorageService.login(data.token, data.user._id)
        }, (error:any) => {
          this.authorizedStep = false
        })
    })
  }

  ngOnDestroy(){
    if (this._subUser) { this._subUser.unsubscribe() }
  }
}
