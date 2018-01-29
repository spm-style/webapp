import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'spm-documentation-use',
  templateUrl: './documentation-use.component.html',
  styleUrls: ['./documentation-use.component.scss']
})
export class DocumentationUseComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'use' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Import packages in your stylesheets',
      nextDoc: 'Publish your creation',
      previousDoc: 'Generate a customized packages',
      nextDocUrl: 'publish',
      previousDocUrl: 'generate'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }

}
