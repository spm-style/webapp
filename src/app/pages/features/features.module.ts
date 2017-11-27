import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
                                                                                // Router
import { FeaturesRouterModule }                                                 from './features.router';
                                                                                // Skell
import { FeaturesComponent }                                                    from './features.component';
                                                                                // Pages
import { FeaturesOverviewComponent }                                            from './pages/features-overview/features-overview.component';
import { FeaturesNativeComponent }                                              from './pages/features-native/features-native.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRouterModule
  ],
  declarations: [
    FeaturesComponent,
    FeaturesNativeComponent,
    FeaturesOverviewComponent
  ]
})
export class FeaturesModule { }
