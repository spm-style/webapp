import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-info-list-item',
  template: `
    <li><ng-content></ng-content></li>
  `,
  styles: [`
    li {
      list-style: square;
      color: #464646;
    }
  `]
})
export class DocInfoListItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
