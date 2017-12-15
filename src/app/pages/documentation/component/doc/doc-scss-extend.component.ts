import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-extend',
  template: `<span class="ds-content">@<span class="ds-extend-property">extend</span><span class="ds-extend-value">{{value}}</span>;</span>`,
  styles: [`
    :host {
      display: block;
      padding-left: 15px;
      padding-top: 5px;
    }
    .ds-content{
      white-space: pre-line;
      color: #fff;
      -webkit-font-smoothing: antialiased;
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
