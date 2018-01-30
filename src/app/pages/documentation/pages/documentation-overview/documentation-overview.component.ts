import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, FETCH_SEO_DATA } from '../../../../store'

@Component({
  templateUrl: './documentation-overview.component.html',
  styleUrls: ['./documentation-overview.component.scss']
})
export class DocumentationOverviewComponent implements OnInit{

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName:'docOverview' })
    this._redux.dispatch({ type: CHANGE_CURRENT_DOC, currentDoc: 'Documentation' })
  }
}
