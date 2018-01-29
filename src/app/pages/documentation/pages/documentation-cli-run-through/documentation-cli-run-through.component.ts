import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  templateUrl: './documentation-cli-run-through.component.html',
  styleUrls: ['./documentation-cli-run-through.component.scss']
})
export class DocumentationCliRunThroughComponent implements OnInit, OnDestroy {

  constructor(
    private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ){}

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'CLI run through' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'CLI run-through',
      nextDoc: 'Initialize your project',
      previousDoc: 'How spm works',
      nextDocUrl: 'init',
      previousDocUrl: 'workings'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }
}
