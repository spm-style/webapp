import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, FETCH_SEO_DATA } from '../../../../store'
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
    this._redux.dispatch({type: FETCH_SEO_DATA, pageName: 'docPublish' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Publish your creation',
      nextDoc: 'Cheat sheet',
      previousDoc: 'Generating a customized package',
      nextDocUrl: 'cheat-sheet',
      previousDocUrl: 'install'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }

}
