import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
                                                                                // Router
import { JobsRouterModule }                                                     from './jobs.router';
                                                                                // Skell
import { JobsComponent }                                                        from './jobs.component';
                                                                                // Pages
import { JobsOverviewComponent }                                                from './pages/jobs-overview/jobs-overview.component';

@NgModule({
  imports: [
    CommonModule,
    JobsRouterModule
  ],
  declarations: [
    JobsComponent,
    JobsOverviewComponent
  ]
})
export class JobsModule { }
