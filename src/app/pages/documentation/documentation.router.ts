import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { DocumentationComponent }                                               from './documentation.component';
                                                                                // Pages
import { DocumentationOverviewComponent }                                       from './pages/documentation-overview/documentation-overview.component';
import { DocumentationGettingStartComponent }                                   from './pages/documentation-getting-start/documentation-getting-start.component';
import { DocumentationCheatSheetComponent }                                     from './pages/documentation-cheat-sheet/documentation-cheat-sheet.component';

const DOCUMENTATION_ROUTES:Routes = [
  { path: '', component: DocumentationComponent, children: [
    { path: '', component: DocumentationOverviewComponent, pathMatch: 'full' },
    { path: 'getting-started', component: DocumentationGettingStartComponent},
    { path: 'cheat-sheet', component: DocumentationCheatSheetComponent},
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(DOCUMENTATION_ROUTES) ],
  exports: [ RouterModule ]
})
export class DocumentationRouterModule {}
