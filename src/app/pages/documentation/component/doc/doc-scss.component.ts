import { Component } from '@angular/core';

@Component({
  selector: 'doc-scss',
  template: `<pre><code><ng-content></ng-content></code></pre>`,
  styles: [`
    :host {
      background-color: #000;
      border-left: 4px solid red;
      border-radius: 4px;
      display: block;
      letter-spacing: 2px;
    }

    pre {
      margin: 0;
    }

    pre code {
      padding: 15px 5px;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class DocScssComponent {}
