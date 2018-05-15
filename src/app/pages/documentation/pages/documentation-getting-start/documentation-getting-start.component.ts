import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, FETCH_SEO_DATA } from '../../../../store'
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
    this._redux.dispatch({type: FETCH_SEO_DATA, pageName: 'docGettingStarted' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Getting started',
      nextDoc: 'Tutorial',
      previousDoc: 'What is spm ?',
      nextDocUrl: 'tutorial',
      previousDocUrl: 'what-is-spm'
    })
  }

  ngOnDestroy(){
  }

}
