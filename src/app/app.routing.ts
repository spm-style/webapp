import { NgModule }                                                             from '@angular/core'
import { RouterModule, Routes }                                                 from '@angular/router'
                                                                                // Pages
import { HomeComponent }                                                        from './pages/home/home.component'
import { NotFoundComponent }                                                    from './pages/not-found/not-found.component'
import { ReportingAbuseComponent }                                              from './pages/reporting-abuse/reporting-abuse.component';
import { PricingComponent }                                                     from './pages/pricing/pricing.component'
import { AboutComponent }                                                       from './pages/about/about.component'
import { ContactComponent }                                                     from './pages/contact/contact.component'
import { UserComponent }                                                        from './pages/user/user.component'

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent, data: {key: "contact"} },
  // { path: 'about', component: AboutComponent },
  // { path: 'reporting-abuse', component: ReportingAbuseComponent },
  // { path: 'status', loadChildren: 'app/pages/status/status.module#StatusModule'},
  { path: 'packages', loadChildren: 'app/pages/packages/packages.module#PackagesModule'},
  { path: 'policies', loadChildren: 'app/pages/policies/policies.module#PoliciesModule'},
  // { path: 'jobs', loadChildren: 'app/pages/jobs/jobs.module#JobsModule'},
  // { path: 'features', loadChildren: 'app/pages/features/features.module#FeaturesModule'},
  { path: 'documentation', loadChildren: 'app/pages/documentation/documentation.module#DocumentationModule'},
  { path: 'connection', loadChildren: 'app/pages/connection/connection.module#ConnectionModule'},
  { path: 'profile', loadChildren: 'app/pages/profile/profile.module#ProfileModule'},
  { path: 'user/:name', component: UserComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  // imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
