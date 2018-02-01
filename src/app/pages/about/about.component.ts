import { Component, OnInit } from '@angular/core';
import { NgRedux, RDXRootState, FETCH_SEO_DATA } from '../../store'

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'about' })
  }

}
