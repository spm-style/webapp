import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store';

@Component({
  selector: 'spm-documentation-generate',
  templateUrl: './documentation-generate.component.html',
  styleUrls: ['./documentation-generate.component.scss']
})
export class DocumentationGenerateComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>){}

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'generate' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Generating a customized package',
      nextDoc: 'Import packages in your stylesheets',
      previousDoc: 'Install fancy packages',
      nextDocUrl: 'use',
      previousDocUrl: 'install'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }

}
