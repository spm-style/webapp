import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, FETCH_SEO_DATA } from '../../../../store'

@Component({
  templateUrl: './policies-terms.component.html',
  styleUrls: ['./policies-terms.component.scss']
})
export class PoliciesTermsComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'policiesTerms' })
  }

}
