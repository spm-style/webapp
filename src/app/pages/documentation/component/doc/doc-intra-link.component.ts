import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-intra-link',
  template: `
    <a [routerLink]="'/documentation/'+link">
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    a {
      color: coral;
    }
  `]
})
export class DocIntraLinkComponent {
  @Input('link') readonly link:string;
}
