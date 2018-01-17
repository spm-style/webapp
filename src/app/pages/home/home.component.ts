import { Component, OnInit } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE } from '../../store'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'home' })
  }

}
