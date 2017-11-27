import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-description',
  template: `<p><ng-content></ng-content></p>`,
  styles: [`
    p{
      text-align: justify;
      line-height: 1.5;
      font-size: 1.1rem;
      color: #464646;
      margin-bottom: 15px;
    }
  `]
})
export class DocDescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
