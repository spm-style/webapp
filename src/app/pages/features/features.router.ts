import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { FeaturesComponent }                                                    from './features.component';
                                                                                // Pages
import { FeaturesOverviewComponent }                                            from './pages/features-overview/features-overview.component';
import { FeaturesNativeComponent }                                              from './pages/features-native/features-native.component';

const FEATURES_ROUTES:Routes = [
  { path: '', component: FeaturesComponent, children: [
    { path: '', component: FeaturesOverviewComponent, pathMatch: 'full' },
    { path: 'native', component: FeaturesNativeComponent }
  ]}
]

@NgModule({
  imports: [ RouterModule.forChild(FEATURES_ROUTES) ],
  exports: [ RouterModule ]
})
export class FeaturesRouterModule {}
