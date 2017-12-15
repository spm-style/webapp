import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-instruction',
  template: `<span class="ds-instruction">{{content}} : <span class="ds-instruction-func" *ngIf="func">{{func}}(</span><span *ngFor="let value of values; let i = index" class="ds-instruction-value-{{getValueCalss(value)}}"><span *ngIf="i > 0" class="ds-dot">, </span>{{value}}</span><span class="ds-instruction-func" *ngIf="func">)</span>;</span>`,
  styles: [`
    :host {
      display: block;
      padding-left: 15px;
      padding-top: 5px;
    }

    .ds-instruction{
      white-space: pre-line;
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }

    .ds-instruction-func {
      color: skyblue;
    }

    .ds-instruction-value-base {
      color: orange;
    }

    .ds-instruction-value-variable {
      color: #D36169;
    }

    .ds-dot {
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }
  `]
})
export class DocScssInstructionComponent {

  @Input('content') readonly content:string;
  @Input('func') readonly func:string;
  @Input('values') readonly values:string[];

  public getValueCalss = (value:string) => {
    if(value.startsWith('$', 0)){
      return 'variable';
    }else{
      return 'base';
    }
  }
}
