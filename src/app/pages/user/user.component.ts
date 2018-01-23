import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE, Observable } from '../../store'
import { ApiUserService, IUser } from '../../service/api-user.service'

@Component({
  selector: 'spm-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  private _subActivatedRoute:Subscription
  private _subApiUser:Subscription
  public user:IUser

  constructor(
  	private _redux:NgRedux<RDXRootState>,
  	private _apiUserService:ApiUserService,
  	private _activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {

    this._subActivatedRoute = this._activatedRoute.params.subscribe((data:any) => {
      this._subApiUser = this._apiUserService.getUserByName(data.name).subscribe((user:IUser) => {
        this.user = user
  	    this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'this.user.login' })
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
