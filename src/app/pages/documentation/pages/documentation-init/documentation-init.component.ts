import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, FETCH_SEO_DATA } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'spm-documentation-init',
  templateUrl: './documentation-init.component.html',
  styleUrls: ['./documentation-init.component.scss']
})
export class DocumentationInitComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit() {
    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'docInit' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Initialize your project',
      nextDoc: 'Install fancy modules',
      previousDoc: 'CLI run-through',
      nextDocUrl: 'install',
      previousDocUrl: 'cli-run-through'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }
}
