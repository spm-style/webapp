import { Component, OnInit } from '@angular/core'
import { NgRedux, RDXRootState, FETCH_SEO_DATA } from '../../../../store'
import { environment } from '../../../../../environments/environment'

@Component({
  templateUrl: './policies-privacy.component.html',
  styleUrls: ['./policies-privacy.component.scss']
})
export class PoliciesPrivacyComponent implements OnInit {

  public email:string = `contact@${environment.domaine}`
  public url:string = `${environment.wwwUrl}/abuses`

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'policiesPrivacy' })
  }

}
