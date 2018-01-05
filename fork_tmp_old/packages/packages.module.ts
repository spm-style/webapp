import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
import { HttpModule }                                                           from '@angular/http';
                                                                                // Router
import { PackagesRouterModule }                                                 from './packages.router';
                                                                                // Skell
import { PackagesComponent }                                                    from './packages.component';
                                                                                // Pages
import { PackagesDetailComponent }                                              from './pages/packages-detail/packages-detail.component';
import { PackagesOverviewComponent }                                            from './pages/packages-overview/packages-overview.component';
                                                                                // Component
import { PinterestGridCardComponent }                                           from './component/pinterest-grid-card/pinterest-grid-card.component';
                                                                                // Service
import { PinterestGridService }                                                 from './service/pinterest-grid.service';

@NgModule({
  imports: [
    CommonModule,
    PackagesRouterModule,
    HttpModule
  ],
  declarations: [
    PackagesComponent,
    PackagesDetailComponent,
    PackagesOverviewComponent,
    PinterestGridCardComponent
  ],
  providers: [
    // PinterestGridService,
  ]
})
export class PackagesModule { }
