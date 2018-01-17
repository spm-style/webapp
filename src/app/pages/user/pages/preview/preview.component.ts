import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE, IUser, Observable } from '../../../../store'
import { ApiUserService } from '../../../../service/api-user.service'

@Component({
  selector: 'spm-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

  private _subActivatedRoute:Subscription
  private _subApiUser:Subscription
  public user:IUser

  constructor(
  	private _redux:NgRedux<RDXRootState>,
  	private _apiUserService:ApiUserService,
  	private _activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
  	this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'profile preview' })

  	this._subActivatedRoute = this._activatedRoute.params.subscribe((data:any) => {
  		this._subApiUser = this._apiUserService.getUserByName(data.name).subscribe((user:IUser) => {
  			this.user = user
  			console.log('user', this.user)
  		})
    })
  }

  ngOnDestroy(){
  	if (this._subActivatedRoute) {
  		this._subActivatedRoute.unsubscribe()
  	}

  	if (this._subApiUser) {
  		this._subApiUser.unsubscribe()
  	}
  }

}
