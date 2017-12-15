import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC } from '../../../../store';

@Component({
  templateUrl: './documentation-graphical-interface-run-through.component.html',
  styleUrls: ['./documentation-graphical-interface-run-through.component.scss']
})
export class DocumentationGraphicalInterfaceRunThroughComponent implements OnInit, OnDestroy{
  constructor(private _redux:NgRedux<RDXRootState>) { }
  ngOnInit() {
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Generating a customized package',
      nextDoc: 'Install fancy packages',
      previousDoc: 'Import packages in your stylesheets',
      nextDocUrl: 'install',
      previousDocUrl: 'use'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }
}
