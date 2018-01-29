import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'spm-documentation-workings',
  templateUrl: './documentation-workings.component.html',
  styleUrls: ['./documentation-workings.component.scss']
})
export class DocumentationWorkingsComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'workings' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'How spm works',
      nextDoc: 'CLI run-through',
      previousDoc: 'Getting started',
      nextDocUrl: 'cli-run-through',
      previousDocUrl: 'getting-started'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }

}
