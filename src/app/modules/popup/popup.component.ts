import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostListener} from "@angular/core";
import { NgRedux, RDXRootState, STOP_MAIN_CONTAINER_SCROLL, START_MAIN_CONTAINER_SCROLL } from '../../store';

@Component({
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {

  constructor(
  	private _redux:NgRedux<RDXRootState>
  ) { }

  ngOnInit() {
  	this._redux.dispatch({ type: STOP_MAIN_CONTAINER_SCROLL })
  }

  ngOnDestroy(){
  	this._redux.dispatch({ type: START_MAIN_CONTAINER_SCROLL })
  }
}
