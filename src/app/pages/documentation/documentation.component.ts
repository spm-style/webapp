import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { select, Observable } from '../../store';

@Component({
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  @select(['doc', 'previousDoc']) readonly previousDoc:Observable<string>;
  @select(['doc', 'nextDoc']) readonly nextDoc:Observable<string>;
  @select(['doc', 'previousDocUrl']) readonly previousDocUrl:Observable<string>;
  @select(['doc', 'nextDocUrl']) readonly nextDocUrl:Observable<string>;
  @select(['doc', 'currentDoc']) readonly currentDoc:Observable<string>;
  @select(['doc', 'currentFragment']) readonly currentFragment:Observable<string>;

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
