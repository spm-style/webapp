import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
import { PopupComponent } from './popup.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

const POPUP_ROUTES:Routes = [
	{ path: 'full', component: PopupComponent, outlet: 'popup', children: [
		{ path: 'userRemove', component: ConfirmationComponent}
	]}
]


@NgModule({
  imports: [ RouterModule.forRoot(POPUP_ROUTES) ],
  exports: [ RouterModule ]
})
export class PopupRouterModule {}
