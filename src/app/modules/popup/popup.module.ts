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

	private _isLoad = false
	private _subRouterEvent:Subscription

	constructor(private _router:Router) {
    this._subRouterEvent = _router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        !this._isLoad && event.urlAfterRedirects.includes('popup') ? _router.navigate([{outlets: {'popup': null}}]) : this._isLoad = true
        this._subRouterEvent.unsubscribe()
      }
    })
  }

}
