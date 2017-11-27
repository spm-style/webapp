import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
                                                                                // Router
import { PoliciesRouterModule }                                                 from './policies.router';
                                                                                // Skell
import { PoliciesComponent }                                                    from './policies.component';
                                                                                // Pages
import { PoliciesPrivacyComponent }                                             from './pages/policies-privacy/policies-privacy.component';
import { PoliciesConductComponent }                                             from './pages/policies-conduct/policies-conduct.component';
import { PoliciesTermsComponent }                                               from './pages/policies-terms/policies-terms.component';

@NgModule({
  imports: [
    CommonModule,
    PoliciesRouterModule
  ],
  declarations: [
    PoliciesComponent,
    PoliciesTermsComponent,
    PoliciesConductComponent,
    PoliciesPrivacyComponent
  ]
})
export class PoliciesModule { }
