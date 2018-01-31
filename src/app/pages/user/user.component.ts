import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { NgRedux, RDXRootState, FETCH_SEO_DATA, Observable } from '../../store'
import { ApiUserService, IUser } from '../../service/api-user.service'
import { environment } from '../../../environments/environment'

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
  	    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'user',
          opts: {
            title: `${user.login} - spm, build up your design`,
            keywords: `${user.login}, profile, user, public, design, style, spm`,
            description: `${user.login} profile page for spm, style package manager and registry`,
            canonical: `${environment.wwwUrl}/user/${user.login}`,
            shortTitle: `${user.login} - spm`,
            image: `${environment.wwwUrl}/assets/profile.svg`,
            twitterCard: 'summary'
          }
        })
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
