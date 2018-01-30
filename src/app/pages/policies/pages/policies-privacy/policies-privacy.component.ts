import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, FETCH_SEO_DATA } from '../../../../store'

@Component({
  templateUrl: './policies-privacy.component.html',
  styleUrls: ['./policies-privacy.component.scss']
})
export class PoliciesPrivacyComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'policiesPrivacy' })
  }

}
