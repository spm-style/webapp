import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, FETCH_SEO_DATA } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'spm-documentation-tutorial',
  templateUrl: './documentation-tutorial.component.html',
  styleUrls: ['./documentation-tutorial.component.scss']
})
export class DocumentationTutorialComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'docTutorial' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Tutorial',
      nextDoc: 'How spm works',
      previousDoc: 'Getting started',
      nextDocUrl: 'workings',
      previousDocUrl: 'getting-started'
    })
  }

  ngOnDestroy(){
  }


}
