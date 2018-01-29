import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'spm-documentation-install',
  templateUrl: './documentation-install.component.html',
  styleUrls: ['./documentation-install.component.scss']
})
export class DocumentationInstallComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'install' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Install fancy packages',
      nextDoc: 'Generate a customized packages',
      previousDoc: 'Initialize your project',
      nextDocUrl: 'generate',
      previousDocUrl: 'init'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = '' }
  }
}
