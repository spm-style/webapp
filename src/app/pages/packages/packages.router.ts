import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { PackagesComponent }                                                    from './packages.component';
                                                                                // Pages
import { PackagesDetailComponent }                                              from './pages/packages-detail/packages-detail.component';
import { PackagesOverviewComponent }                                            from './pages/packages-overview/packages-overview.component';

const PACKAGES_ROUTES:Routes = [
  { path: '', component: PackagesComponent, children: [
    { path: '', component: PackagesOverviewComponent, pathMatch: 'full', data: {key: "list"} },
    { path: ':name', component: PackagesDetailComponent}
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(PACKAGES_ROUTES) ],
  exports: [ RouterModule ]
})
export class PackagesRouterModule {}
