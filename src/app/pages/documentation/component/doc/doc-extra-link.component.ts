import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-extra-link',
  template: `
    <a href="{{link}}" target="_blank">
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    a {
      color: purple;
    }
  `]
})
export class DocExtraLinkComponent {
  @Input('link') readonly link:string;
}
