import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
                                                                                // Router
import { DocumentationRouterModule }                                            from './documentation.router';
                                                                                // Skell
import { DocumentationComponent }                                               from './documentation.component';
                                                                                // Pages
import { DocumentationOverviewComponent }                                       from './pages/documentation-overview/documentation-overview.component';
import { DocumentationWhatIsSpmComponent }                                      from './pages/documentation-what-is-spm/documentation-what-is-spm.component';
import { DocumentationGettingStartComponent }                                   from './pages/documentation-getting-start/documentation-getting-start.component';
import { DocumentationWorkingsComponent }                                       from './pages/documentation-workings/documentation-workings.component';
import { DocumentationGraphicalInterfaceRunThroughComponent }                   from './pages/documentation-graphical-interface-run-through/documentation-graphical-interface-run-through.component';
import { DocumentationCliRunThroughComponent }                                  from './pages/documentation-cli-run-through/documentation-cli-run-through.component';
import { DocumentationCheatSheetComponent }                                     from './pages/documentation-cheat-sheet/documentation-cheat-sheet.component';
import { DocumentationInitComponent }                                           from './pages/documentation-init/documentation-init.component';
import { DocumentationInstallComponent }                                        from './pages/documentation-install/documentation-install.component';
import { DocumentationGenerateComponent }                                       from './pages/documentation-generate/documentation-generate.component';
import { DocumentationUseComponent }                                            from './pages/documentation-use/documentation-use.component';
import { DocumentationPublishComponent }                                        from './pages/documentation-publish/documentation-publish.component';
                                                                                // Component
import { DocHighlightComponent }                                                from './component/doc/doc-highlight.component';
import { DocDescriptionComponent }                                              from './component/doc/doc-description.component';
import { DocTerminalComponent }                                                 from './component/doc/doc-terminal.component';
import { DocTerminalInstructionComponent }                                      from './component/doc/doc-terminal-instruction.component';
import { DocInfoComponent }                                                     from './component/doc/doc-info.component';
import { DocInfoListComponent }                                                 from './component/doc/doc-info-list.component';
import { DocInfoListItemComponent }                                             from './component/doc/doc-info-list-item.component';
import { DocScssComponent }                                                     from './component/doc/doc-scss.component';
import { DocScssInstructionComponent }                                          from './component/doc/doc-scss-instruction.component';
import { DocScssImportComponent }                                               from './component/doc/doc-scss-import.component';
import { DocScssBlockComponent }                                                from './component/doc/doc-scss-block.component';
import { DocScssIncludeComponent }                                              from './component/doc/doc-scss-include.component';
import { DocScssExtendComponent }                                               from './component/doc/doc-scss-extend.component';
import { DocScssMixinComponent }                                                from './component/doc/doc-scss-mixin.component';
import { DocScssTabComponent }                                                  from './component/doc/doc-scss-tab.component';
import { DocIntraLinkComponent }                                                from './component/doc/doc-intra-link.component';
import { DocExtraLinkComponent }                                                from './component/doc/doc-extra-link.component';
import { DocCliMessageComponent } from './component/doc/doc-cli-message.component';

@NgModule({
  imports: [
    CommonModule,
    DocumentationRouterModule
  ],
  declarations: [
    DocumentationComponent,
    DocumentationOverviewComponent,
    DocumentationGettingStartComponent,
    DocumentationCheatSheetComponent,
    DocHighlightComponent,
    DocDescriptionComponent,
    DocTerminalComponent,
    DocTerminalInstructionComponent,
    DocInfoComponent,
    DocInfoListComponent,
    DocInfoListItemComponent,
    DocScssComponent,
    DocScssInstructionComponent,
    DocScssImportComponent,
    DocScssBlockComponent,
    DocScssIncludeComponent,
    DocScssExtendComponent,
    DocScssMixinComponent,
    DocScssTabComponent,
    DocumentationInitComponent,
    DocumentationInstallComponent,
    DocumentationGenerateComponent,
    DocumentationUseComponent,
    DocumentationPublishComponent,
    DocumentationWorkingsComponent,
    DocIntraLinkComponent,
    DocExtraLinkComponent,
    DocumentationWhatIsSpmComponent,
    DocumentationCliRunThroughComponent,
    DocumentationGraphicalInterfaceRunThroughComponent,
    DocCliMessageComponent
  ]
})
export class DocumentationModule { }
