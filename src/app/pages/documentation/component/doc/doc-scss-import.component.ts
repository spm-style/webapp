import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-import',
  template: `<span class="ds-content">@<span class="ds-import-property">import</span>"<span class="ds-import-value">{{value}}</span>";</span>`,
  styles: [`
    :host {
      display: block;
      padding-left: 15px;
      padding-bottom: 5px;
    }
    .ds-content{
      white-space: pre-line;
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }
    .ds-content .ds-import-property{
      color: #C678DD;
      padding-right: 5px;
    }
    .ds-content .ds-import-value{
      color: #8DC379;
    }
  `]
})
export class DocScssImportComponent {

  @Input('value') readonly value:string;

}
