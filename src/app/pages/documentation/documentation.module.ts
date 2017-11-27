import { NgModule }                                                             from '@angular/core';
import { CommonModule }                                                         from '@angular/common';
                                                                                // Router
import { DocumentationRouterModule }                                            from './documentation.router';
                                                                                // Skell
import { DocumentationComponent }                                               from './documentation.component';
                                                                                // Pages
import { DocumentationOverviewComponent }                                       from './pages/documentation-overview/documentation-overview.component';
import { DocumentationGettingStartComponent }                                   from './pages/documentation-getting-start/documentation-getting-start.component';
import { DocumentationCheatSheetComponent }                                     from './pages/documentation-cheat-sheet/documentation-cheat-sheet.component';
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
    DocScssTabComponent
  ]
})
export class DocumentationModule { }
