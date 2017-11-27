import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
                                                                                // Router
import { StatusRouterModule }                                                   from './status.router';
                                                                                // Skell
import { StatusComponent }                                                      from './status.component';
                                                                                // Pages
import { StatusOverviewComponent }                                              from './pages/status-overview/status-overview.component';

@NgModule({
  imports: [
    CommonModule,
    StatusRouterModule
  ],
  declarations: [
    StatusComponent,
    StatusOverviewComponent
  ]
})
export class StatusModule { }
