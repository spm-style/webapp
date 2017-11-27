import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Pages
import { HomeComponent }                                                        from './pages/home/home.component';
import { NotFoundComponent }                                                    from './pages/not-found/not-found.component';
import { ReportingAbuseComponent }                                              from './pages/reporting-abuse/reporting-abuse.component';
import { PricingComponent }                                                     from './pages/pricing/pricing.component';
import { AboutComponent }                                                       from './pages/about/about.component';
import { ContactComponent }                                                     from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reporting-abuse', component: ReportingAbuseComponent },
  { path: 'status', loadChildren: 'app/pages/status/status.module#StatusModule'},
  { path: 'policies', loadChildren: 'app/pages/policies/policies.module#PoliciesModule'},
  { path: 'packages', loadChildren: 'app/pages/packages/packages.module#PackagesModule'},
  { path: 'jobs', loadChildren: 'app/pages/jobs/jobs.module#JobsModule'},
  { path: 'features', loadChildren: 'app/pages/features/features.module#FeaturesModule'},
  { path: 'documentation', loadChildren: 'app/pages/documentation/documentation.module#DocumentationModule'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
