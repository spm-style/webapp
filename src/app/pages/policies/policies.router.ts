import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { PoliciesComponent }                                                    from './policies.component';
                                                                                // Pages
import { PoliciesPrivacyComponent }                                             from './pages/policies-privacy/policies-privacy.component';
import { PoliciesConductComponent }                                             from './pages/policies-conduct/policies-conduct.component';
import { PoliciesTermsComponent }                                               from './pages/policies-terms/policies-terms.component';

const POLICIES_ROUTES:Routes = [
  { path: '', component: PoliciesComponent, children: [
    { path: 'privacy', component: PoliciesPrivacyComponent },
    { path: 'conduct', component: PoliciesConductComponent },
    { path: 'terms', component: PoliciesTermsComponent }
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(POLICIES_ROUTES) ],
  exports: [ RouterModule ]
})
export class PoliciesRouterModule {}
