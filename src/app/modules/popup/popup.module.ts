import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRouterModule } from './popup.router'
import { PopupComponent } from './popup.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { PopupService } from './popup.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

@NgModule({
  imports: [
  	PopupRouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PopupComponent, ConfirmationComponent],
  providers: [PopupService]
})
export class PopupModule {

	// private _isLoad = false
	// private _subRouterEvent:Subscription

	// constructor(private _router:Router) {
	// 	// this._router.navigate(['user'])

 //    this._subRouterEvent = this._router.events.subscribe((event) => {
 //      if(event instanceof NavigationEnd){        
 //        if(!this._isLoad && event.urlAfterRedirects.includes('popup')){
 //          let tmp = event.urlAfterRedirects.split('(')[0].slice(1).split('/')
 //          console.log(tmp)
 //          this._isRefresh(tmp)
 //          // this._router.navigate(['user'])
 //          // this._router.navigate([event.urlAfterRedirects.split('(')[0], { outlets: { 'popup': null }}])
 //        }else{
 //        	this._isLoad = true
 //        }
 //        // this._router.navigate(['user'])
 //      }
 //      // this._router.navigate(['user'])
 //      // this._subRouterEvent.unsubscribe()
 //    })
 //  }

	// private _isRefresh(url:any[]):void {
	// 	url.push({outlets: {'popup':null} })
 //  	console.log(url, this._router)
	// 	this._router.navigate(['user'])
 //  }
}



// import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
// import { Subscription } from 'rxjs/Subscription'

// import { select, Observable } from './store'

// @Component({
//   selector: 'spm-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {

// 	private _subRouterEvent:Subscription

//   @select(['app', 'testApp']) readonly test: Observable<string>;

  // constructor(
  // 	private _router:Router,
  // 	private _activatedRoute:ActivatedRoute) {
  // }


