import { Component, OnInit } from '@angular/core';
import { NgRedux, RDXRootState, FETCH_SEO_DATA } from '../../store'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'home' })
  }
}
