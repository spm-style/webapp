import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doc-terminal',
  template: `<pre><code><ng-content></ng-content></code></pre>`,
  styles: [`
    pre{
      background-color: #000;
      border-left: 4px solid red;
      border-radius: 4px;
      word-spacing: 5px;
      padding-top: 5px;
    }
  `]
})
export class DocTerminalComponent{}
