import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, FETCH_SEO_DATA } from '../../../../store'
import { environment } from '../../../../../environments/environment'

@Component({
  templateUrl: './policies-conduct.component.html',
  styleUrls: ['./policies-conduct.component.scss']
})
export class PoliciesConductComponent implements OnInit {

  public email:string = `abuse@${environment.domaine}`
  public url:string = `${environment.wwwUrl}/abuses`

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'policiesConduct' })
  }

}
