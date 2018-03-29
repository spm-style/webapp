import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiStatusService, IStatus } from '../../../../service/api-status.service'
import { CdnStatusService } from '../../../../service/cdn-status.service'
import { Subscription } from 'rxjs/Subscription'
import { RDXRootState, NgRedux, FETCH_SEO_DATA } from '../../../../store'

@Component({
  templateUrl: './status-overview.component.html',
  styleUrls: ['./status-overview.component.scss']
})
export class StatusOverviewComponent implements OnInit, OnDestroy {

	private _subStatusAPI:Subscription
	private _subStatusCDN:Subscription
	public statusAPI:boolean = true
	public statusCDN:boolean = true

  constructor(
  	private _apiStatus:ApiStatusService,
  	private _cdnStatus:CdnStatusService,
    private _redux:NgRedux<RDXRootState>
  ) { }

  ngOnInit() {
    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'status' })
  	this._subStatusAPI = this._apiStatus.ping()
  	.subscribe((data:IStatus) => {
  		this.statusAPI = true
  	}, (err:any) => {
  		this.statusAPI = false
  	})
  	this._subStatusAPI = this._cdnStatus.ping()
  	.subscribe((data:IStatus) => {
  		this.statusCDN = true
  	}, (err:any) => {
  		this.statusCDN = false
  	})
  }

  ngOnDestroy(){
  	if (this._subStatusAPI) { this._subStatusAPI.unsubscribe() }
  	if (this._subStatusCDN) { this._subStatusCDN.unsubscribe() }
  }

}
