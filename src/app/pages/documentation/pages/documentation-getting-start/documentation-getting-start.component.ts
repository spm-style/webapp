import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  templateUrl: './documentation-getting-start.component.html',
  styleUrls: ['./documentation-getting-start.component.scss']
})
export class DocumentationGettingStartComponent implements OnInit, OnDestroy {

  constructor(
    private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'getting started' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Getting started',
      nextDoc: 'How spm works',
      previousDoc: 'What is spm ?',
      nextDocUrl: 'workings',
      previousDocUrl: 'what-is-spm'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }

}
