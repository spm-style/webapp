import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC } from '../../../../store';

@Component({
  selector: 'spm-documentation-workings',
  templateUrl: './documentation-workings.component.html',
  styleUrls: ['./documentation-workings.component.scss']
})
export class DocumentationWorkingsComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'How spm works',
      nextDoc: 'CLI run-through',
      previousDoc: 'Getting started',
      nextDocUrl: 'cli-run-through',
      previousDocUrl: 'getting-started'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }

}
