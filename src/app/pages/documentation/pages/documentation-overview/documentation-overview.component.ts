import { Component, OnInit } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store';

@Component({
  templateUrl: './documentation-overview.component.html',
  styleUrls: ['./documentation-overview.component.scss']
})
export class DocumentationOverviewComponent implements OnInit{

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'documentation' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Documentation',
    })
  }
}
