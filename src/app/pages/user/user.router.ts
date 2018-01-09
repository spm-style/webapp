import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { UserComponent }                                                        from './user.component';
                                                                                // Pages
import { SettingsComponent }                                                    from './pages/settings/settings.component';
import { PublicComponent }                                                      from './pages/public/public.component';
import { PackagesComponent }                                                    from './pages/packages/packages.component';
import { PreviewComponent }                                                     from './pages/preview/preview.component';

const USER_ROUTES:Routes = [
  { path: '', component: UserComponent, children: [
    { path: '', component: PublicComponent, pathMatch: 'full' },
    { path: 'preview', component: PreviewComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'packages', component: PackagesComponent},
    { path: ':id', component: PreviewComponent }
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(USER_ROUTES) ],
  exports: [ RouterModule ]
})
export class UserRouterModule {}
