import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store';

@Component({
  templateUrl: './documentation-cheat-sheet.component.html',
  styleUrls: ['./documentation-cheat-sheet.component.scss']
})
export class DocumentationCheatSheetComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'cheat sheet' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Cheat sheet',
      nextDoc: '',
      previousDoc: 'Publish your creation',
      nextDocUrl: '',
      previousDocUrl: 'publish'
    })
    window.location.hash = 'title'
  }

  ngOnDestroy(){
    window.location.hash = ''
  }

}
