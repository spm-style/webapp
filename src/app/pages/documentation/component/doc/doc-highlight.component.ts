import { Component } from '@angular/core';

@Component({
  selector: 'doc-highlight',
  template: `<span><ng-content></ng-content></span>`,
  styles: [`
    span {
      background-color: #eee;
      color: #ef0c42;
      padding: 0 5px;
    }
  `]
})
export class DocHighlightComponent {}
