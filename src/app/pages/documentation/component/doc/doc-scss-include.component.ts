import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-include',
  template: `@<span class="ds-include-property">include</span><span class="ds-include-func">{{func}}(</span><span *ngFor="let value of values; let i = index" class="ds-include-value-{{getValueCalss(value)}}"><span *ngIf="i > 0" class="ds-dot">, </span>{{value}}</span><span class="ds-include-func">)</span>;`,
  styles: [`
    :host {
      display: inline-flex;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      padding-left: 18px;
      margin-bottom: 6px;
    }
    .ds-include-property{
      color: #C678DD;
      padding-right: 5px;
    }
    .ds-include-func{
      color: lightblue;
    }
    .ds-include-value-base {
      color: orange;
    }

    .ds-include-value-variable {
      color: #D36169;
    }

    .ds-dot {
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }
  `]
})
export class DocScssIncludeComponent {

  @Input('values') readonly values:string[];
  @Input('func') readonly func:string;

  public getValueCalss = (value:string) => {
    if(value.startsWith('$', 0)){
      return 'variable';
    }else{
      return 'base';
    }
  }
}
