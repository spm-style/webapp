import { Component } from '@angular/core';

import { select, Observable } from './store';

@Component({
  selector: 'spm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @select(['app', 'testApp']) readonly test: Observable<string>;
  
}
