import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, FETCH_SEO_DATA } from '../../../../store'

@Component({
  templateUrl: './policies-conduct.component.html',
  styleUrls: ['./policies-conduct.component.scss']
})
export class PoliciesConductComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'policiesConduct' })
  }

}
