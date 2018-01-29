import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  templateUrl: './documentation-cheat-sheet.component.html',
  styleUrls: ['./documentation-cheat-sheet.component.scss']
})
export class DocumentationCheatSheetComponent implements OnInit, OnDestroy {

  constructor(
    private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

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
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }

}
