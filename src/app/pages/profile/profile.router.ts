import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { ProfileComponent }                                                        from './profile.component';
                                                                                // Pages
import { SettingsComponent }                                                    from './pages/settings/settings.component';
import { PublicComponent }                                                      from './pages/public/public.component';
import { PackagesComponent }                                                    from './pages/packages/packages.component';
import { PackageDetailComponent }                                               from './pages/package-detail/package-detail.component';

const PROFILE_ROUTES:Routes = [
  { path: '', component: ProfileComponent, children: [
    { path: '', component: PublicComponent, pathMatch: 'full' },
    { path: 'settings', component: SettingsComponent },
    { path: 'packages', component: PackagesComponent },
    { path: 'packages/:name', component: PackageDetailComponent }
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(PROFILE_ROUTES) ],
  exports: [ RouterModule ]
})
export class ProfileRouterModule {}
