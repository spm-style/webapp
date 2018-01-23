import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
import { HttpModule }                                                           from '@angular/http';
import { ReactiveFormsModule, FormsModule }                                     from '@angular/forms';
                                                                                // Router
import { PackagesRouterModule }                                                 from './packages.router';
                                                                                // Skell
import { PackagesComponent }                                                    from './packages.component';
                                                                                // Pages
import { PackagesDetailComponent }                                              from './pages/packages-detail/packages-detail.component';
import { PackagesOverviewComponent }                                            from './pages/packages-overview/packages-overview.component';
                                                                                // Pipe
import { SafeHtmlPipe }                                                         from './pipe/safe-html.pipe';
                                                                                // Component
import { CardComponent }                                                        from './component/card/card.component';




@NgModule({
  imports: [
    CommonModule,
    PackagesRouterModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    PackagesComponent,
    PackagesDetailComponent,
    PackagesOverviewComponent,
    SafeHtmlPipe,
    CardComponent
  ],
  providers: [
    
  ]
})
export class PackagesModule { }
