import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { select, Observable } from './store'

@Component({
  selector: 'spm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	private _subRouterEvent:Subscription

  @select(['app', 'testApp']) readonly test: Observable<string>;

  constructor(
  	private _router:Router,
  	private _activatedRoute:ActivatedRoute) {
  }

  ngOnInit(){
  	// this._router.navigate(['user'])

    // this._subRouterEvent = this._router.events.subscribe((event) => {
    //   if(event instanceof NavigationEnd){        
    //     if(event.urlAfterRedirects.includes('popup')){
    //       let tmp = event.urlAfterRedirects.split('(')[0].slice(1).split('/')
    //       console.log(tmp)
    //       this._isRefresh(tmp)
    //       // this._router.navigate(['user'])
    //       // this._router.navigate([event.urlAfterRedirects.split('(')[0], { outlets: { 'popup': null }}])
    //     }
    //     // this._router.navigate(['user'])
    //   }
    //   // this._router.navigate(['user'])
    //   // this._subRouterEvent.unsubscribe()
    // })
  }
}
