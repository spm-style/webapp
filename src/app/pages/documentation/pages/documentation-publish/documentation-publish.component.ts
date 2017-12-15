import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC } from '../../../../store';

@Component({
  templateUrl: './documentation-publish.component.html',
  styleUrls: ['./documentation-publish.component.scss']
})
export class DocumentationPublishComponent implements OnInit, OnDestroy{

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Publish your creation',
      nextDoc: 'Cheat sheet',
      previousDoc: 'Import packages in your stylesheets',
      nextDocUrl: 'cheat-sheet',
      previousDocUrl: 'use'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }

}
