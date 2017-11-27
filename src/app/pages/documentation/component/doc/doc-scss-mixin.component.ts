import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-mixin',
  template: `@<span class="ds-mixin-property">mixin</span> <span class="ds-mixin-name">{{name}}</span>(<span class="ds-mixin-value" *ngFor="let value of values; let i = index"><span *ngIf="i > 0" class="ds-dot">, </span>{{value}}</span>)<span class="first-brace">&#123;</span><ng-content></ng-content><span class="last-brace">&#125;</span>`,
  styles: [`
    :host {
      display: block;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      padding-left: 18px;
      margin-bottom: 6px;
    }

    .ds-mixin-property{
      color: #C678DD;
    }

    .ds-mixin-name{
      color: lightblue;
    }

    .ds-mixin-value{
      color: #D36169;
    }

    .ds-dot {
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }

    .first-brace{
      padding-left: 4px;
    }

    .last-brace {
      margin-left: -35px;
    }
  `]
})
export class DocScssMixinComponent {

  @Input('name') readonly name:string;
  @Input('values') readonly values:string;

}
