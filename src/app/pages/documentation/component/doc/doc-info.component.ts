import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-info',
  template: `
    <p class="doc-info doc-info-{{type}}"><ng-content></ng-content></p>
  `,
  styles: [`

    .doc-info {
      margin-bottom: 20px;
      padding: 10px 10px 10px 14px;
      border-radius: 6px;
    }

    .doc-info-success {
      background-color: #D0F9C8;
      color: #464646;
    }

    .doc-info-warning {
      background-color: Wheat;
      color: #464646;
    }

    .doc-info-important {
        background-color: #9EC7FB;
        color: #000;
    }
  `]
})
export class DocInfoComponent {

  @Input('type') readonly type:string;

}
