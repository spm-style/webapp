import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { JobsComponent }                                                        from './jobs.component';
                                                                                // Pages
import { JobsOverviewComponent }                                                from './pages/jobs-overview/jobs-overview.component';

const JOBS_ROUTES:Routes = [
  { path: '', component: JobsComponent, children: [
    { path: '', component: JobsOverviewComponent, pathMatch: 'full' },
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(JOBS_ROUTES) ],
  exports: [ RouterModule ]
})
export class JobsRouterModule {}
