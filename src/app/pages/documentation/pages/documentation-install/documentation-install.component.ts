import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store';

@Component({
  selector: 'spm-documentation-install',
  templateUrl: './documentation-install.component.html',
  styleUrls: ['./documentation-install.component.scss']
})
export class DocumentationInstallComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'install' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Install fancy packages',
      nextDoc: 'Generate a customized packages',
      previousDoc: 'Initialize your project',
      nextDocUrl: 'generate',
      previousDocUrl: 'init'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }
}
