import { NgModule }                                                             from '@angular/core';
import { RouterModule, Routes }                                                 from '@angular/router';
                                                                                // Skell
import { DocumentationComponent }                                               from './documentation.component';
                                                                                // Pages
import { DocumentationOverviewComponent }                                       from './pages/documentation-overview/documentation-overview.component';
import { DocumentationGettingStartComponent }                                   from './pages/documentation-getting-start/documentation-getting-start.component';
import { DocumentationWhatIsSpmComponent }                                      from './pages/documentation-what-is-spm/documentation-what-is-spm.component';
import { DocumentationWorkingsComponent }                                       from './pages/documentation-workings/documentation-workings.component';
import { DocumentationGraphicalInterfaceRunThroughComponent }                   from './pages/documentation-graphical-interface-run-through/documentation-graphical-interface-run-through.component';
import { DocumentationCliRunThroughComponent }                                  from './pages/documentation-cli-run-through/documentation-cli-run-through.component';
import { DocumentationInitComponent }                                           from './pages/documentation-init/documentation-init.component';
import { DocumentationInstallComponent }                                        from './pages/documentation-install/documentation-install.component';
import { DocumentationGenerateComponent }                                       from './pages/documentation-generate/documentation-generate.component';
import { DocumentationUseComponent }                                            from './pages/documentation-use/documentation-use.component';
import { DocumentationPublishComponent }                                        from './pages/documentation-publish/documentation-publish.component';
import { DocumentationCheatSheetComponent }                                     from './pages/documentation-cheat-sheet/documentation-cheat-sheet.component';

const DOCUMENTATION_ROUTES:Routes = [
  { path: '', component: DocumentationComponent, children: [
    { path: '', component: DocumentationOverviewComponent, pathMatch: 'full' },
    { path: 'getting-started', component: DocumentationGettingStartComponent},
    { path: 'workings', component: DocumentationWorkingsComponent},
    { path: 'graphical-interface-run-through', component: DocumentationGraphicalInterfaceRunThroughComponent},
    { path: 'cli-run-through', component: DocumentationCliRunThroughComponent},
    { path: 'init', component: DocumentationInitComponent},
    { path: 'install', component: DocumentationInstallComponent},
    { path: 'generate', component: DocumentationGenerateComponent},
    { path: 'use', component: DocumentationUseComponent},
    { path: 'publish', component: DocumentationPublishComponent},
    { path: 'cheat-sheet', component: DocumentationCheatSheetComponent},
    { path: 'what-is-spm', component: DocumentationWhatIsSpmComponent}
  ]}
]


@NgModule({
  imports: [ RouterModule.forChild(DOCUMENTATION_ROUTES) ],
  exports: [ RouterModule ]
})
export class DocumentationRouterModule {}
