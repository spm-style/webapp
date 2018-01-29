import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
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
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'init' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Initialize your project',
      nextDoc: 'Install fancy packages',
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
