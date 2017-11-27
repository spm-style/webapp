import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { StatusComponent }                                                      from './status.component';
                                                                                // Pages
import { StatusOverviewComponent }                                              from './pages/status-overview/status-overview.component';

const STATUS_ROUTES:Routes = [
  { path: '', component: StatusComponent, children: [
    { path: '', component: StatusOverviewComponent, pathMatch: 'full' },
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(STATUS_ROUTES) ],
  exports: [ RouterModule ]
})
export class StatusRouterModule {}
