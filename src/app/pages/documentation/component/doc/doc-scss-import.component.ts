import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-import',
  template: `@<span class="ds-import-property">import</span>"<span class="ds-import-value">{{value}}</span>";`,
  styles: [`
    :host {
      display: inline-flex;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      padding-left: 18px;
      margin-bottom: 6px;
    }
    .ds-import-property{
      color: #C678DD;
      padding-right: 5px;
    }
    .ds-import-value{
      color: #8DC379;
    }
  `]
})
export class DocScssImportComponent {

  @Input('value') readonly value:string;

}
