import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-mixin',
  template: `<span class="ds-content">@<span class="ds-mixin-property">mixin</span> <span class="ds-mixin-name">{{name}}</span>(<span class="ds-mixin-value" *ngFor="let value of values; let i = index"><span *ngIf="i > 0" class="ds-dot">, </span>{{value}}</span>)<span class="first-brace">&#123;</span><ng-content></ng-content><span>&#125;</span></span>`,
  styles: [`
    :host {
      display: block;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      padding-left: 15px;
      margin-bottom: 6px;
    }

    .ds-content{
      white-space: pre-line;
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }

    .ds-content .ds-mixin-property{
      color: #C678DD;
    }

    .ds-content .ds-mixin-name{
      color: lightblue;
    }

    .ds-content .ds-mixin-value{
      color: #D36169;
    }

    .ds-content .ds-dot {
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }

    .ds-content .first-brace{
      padding-left: 4px;
    }
  `]
})
export class DocScssMixinComponent {

  @Input('name') readonly name:string;
  @Input('values') readonly values:string;

}
