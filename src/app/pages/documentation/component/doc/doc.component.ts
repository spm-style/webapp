import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doc',
  template: `<pre><code><ng-content></ng-content></code></pre>`,
  styleUrls: ['doc.component.scss']
})
export class DocComponent{}
