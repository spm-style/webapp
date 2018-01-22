import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgRedux, CHANGE_TAB_TITLE, RDXRootState } from '../../store'

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
  	private _location: Location,
  	private _redux:NgRedux<RDXRootState>
  ) { }

  public backNavigate() { this._location.back() }

  ngOnInit() {
  	this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'not found' })
  }

}
