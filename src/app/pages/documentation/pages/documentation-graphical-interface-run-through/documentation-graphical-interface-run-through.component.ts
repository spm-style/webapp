import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  templateUrl: './documentation-graphical-interface-run-through.component.html',
  styleUrls: ['./documentation-graphical-interface-run-through.component.scss']
})
export class DocumentationGraphicalInterfaceRunThroughComponent implements OnInit, OnDestroy{
  constructor(
    private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit() {
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Generating a customized module',
      nextDoc: 'Install fancy modules',
      previousDoc: 'Import modules in your stylesheets',
      nextDocUrl: 'install',
      previousDocUrl: 'use'
    })
  }

  ngOnDestroy(){
  }
}
