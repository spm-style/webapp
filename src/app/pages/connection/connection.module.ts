import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
                                                                                // Router
import { ConnectionRouterModule }                                               from './connection.router'
                                                                                // Skell
import { ConnectionComponent }                                                  from './connection.component';
                                                                                // Pages
import { SignInComponent }                                                      from './pages/sign-in/sign-in.component';
import { SignUpComponent }                                                      from './pages/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    ConnectionRouterModule
  ],
  declarations: [
    ConnectionComponent,
    SignInComponent,
    SignUpComponent
  ]
})
export class ConnectionModule { }
