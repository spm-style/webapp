import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-extend',
  template: `@<span class="ds-extend-property">extend</span><span class="ds-extend-value">{{value}}</span>;`,
  styles: [`
    :host {
      display: inline-flex;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      padding-left: 18px;
      margin-bottom: 3px;
      margin-left: -50px;
    }
    .ds-extend-property{
      color: #C678DD;
      padding-right: 5px;
    }
    .ds-extend-value{
      color: lightgreen;
    }
  `]
})
export class DocScssExtendComponent {

  @Input('value') readonly value:string;

}
