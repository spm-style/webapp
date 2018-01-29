import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  templateUrl: './documentation-what-is-spm.component.html',
  styleUrls: ['./documentation-what-is-spm.component.scss']
})
export class DocumentationWhatIsSpmComponent implements OnInit, OnDestroy{
  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'what is spm' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'What is spm ?',
      nextDoc: 'Getting started',
      previousDoc: '',
      nextDocUrl: 'getting-started',
      previousDocUrl: ''
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }

}
