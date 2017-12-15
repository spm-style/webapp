import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC } from '../../../../store';

@Component({
  templateUrl: './documentation-cli-run-through.component.html',
  styleUrls: ['./documentation-cli-run-through.component.scss']
})
export class DocumentationCliRunThroughComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>){}

  ngOnInit() {
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'CLI run-through',
      nextDoc: 'Initialize your project',
      previousDoc: 'How spm works',
      nextDocUrl: 'init',
      previousDocUrl: 'workings'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }
}
