import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-info-list',
  template: `
    <div class="doc-info-list doc-info-list-{{type}}">
      <ul>
        <ng-content></ng-content>
      </ul>
    </div>
  `,
  styles: [`
    div {
      background-color: #eee;
    }

    div ul{
      padding-left: 30px;
      li {
        list-style: square;
        color: #464646;
      }
    }

    .doc-info-list{
      margin-bottom: 20px;
      background-color: #eee;
      padding: 10px;
      border-radius: 6px;
    }

    .doc-info-list-important {
      border-left: 4px solid #1E90FF;
    }

    .doc-info-list-warning {
      border-left: 4px solid #F2DEB8;
    }

    .doc-info-list-success {
      border-left: 4px solid #D0F9C8;
    }
  `]
})
export class DocInfoListComponent {

  @Input('type') readonly type:string;

}
