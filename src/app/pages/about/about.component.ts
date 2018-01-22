import { Component, OnInit } from '@angular/core';
import { NgRedux, CHANGE_TAB_TITLE, RDXRootState} from '../../store'

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  	this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'about' })
  }

}
