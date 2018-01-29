import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  templateUrl: './documentation-publish.component.html',
  styleUrls: ['./documentation-publish.component.scss']
})
export class DocumentationPublishComponent implements OnInit, OnDestroy{

  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'publish' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Publish your creation',
      nextDoc: 'Cheat sheet',
      previousDoc: 'Import packages in your stylesheets',
      nextDocUrl: 'cheat-sheet',
      previousDocUrl: 'use'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }

}
