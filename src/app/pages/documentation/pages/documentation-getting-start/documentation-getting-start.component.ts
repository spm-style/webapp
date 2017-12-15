import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC } from '../../../../store';

@Component({
  templateUrl: './documentation-getting-start.component.html',
  styleUrls: ['./documentation-getting-start.component.scss']
})
export class DocumentationGettingStartComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>) { }
  ngOnInit() {
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Getting started',
      nextDoc: 'How spm works',
      previousDoc: 'What is spm ?',
      nextDocUrl: 'workings',
      previousDocUrl: 'what-is-spm'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }

}
