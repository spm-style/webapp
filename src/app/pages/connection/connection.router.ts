import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { ConnectionComponent }                                                  from './connection.component';
                                                                                // Pages
import { SignInComponent }                                                      from './pages/sign-in/sign-in.component';
import { SignUpComponent }                                                      from './pages/sign-up/sign-up.component';

const CONNECTION_ROUTES:Routes = [
  { path: '', component: ConnectionComponent, children: [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent}
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(CONNECTION_ROUTES) ],
  exports: [ RouterModule ]
})
export class ConnectionRouterModule {}
