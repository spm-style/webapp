import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE } from '../../../../store'

@Component({
  templateUrl: './policies-terms.component.html',
  styleUrls: ['./policies-terms.component.scss']
})
export class PoliciesTermsComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'terms' })
  }

}
