import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE } from '../../../../store'

@Component({
  templateUrl: './policies-privacy.component.html',
  styleUrls: ['./policies-privacy.component.scss']
})
export class PoliciesPrivacyComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'privacy' })
  }

}
