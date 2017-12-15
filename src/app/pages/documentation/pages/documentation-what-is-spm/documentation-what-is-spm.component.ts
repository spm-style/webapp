import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC } from '../../../../store';

@Component({
  templateUrl: './documentation-what-is-spm.component.html',
  styleUrls: ['./documentation-what-is-spm.component.scss']
})
export class DocumentationWhatIsSpmComponent implements OnInit, OnDestroy{
  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'What is spm ?',
      nextDoc: 'Getting started',
      previousDoc: '',
      nextDocUrl: 'getting-started',
      previousDocUrl: ''
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }

}
