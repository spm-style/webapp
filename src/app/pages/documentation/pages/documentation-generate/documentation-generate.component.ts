import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, CHANGE_TAB_TITLE } from '../../../../store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'spm-documentation-generate',
  templateUrl: './documentation-generate.component.html',
  styleUrls: ['./documentation-generate.component.scss']
})
export class DocumentationGenerateComponent implements OnInit, OnDestroy {

  constructor(private _redux:NgRedux<RDXRootState>,
    @Inject(PLATFORM_ID) private platformId: any
  ){}

  ngOnInit() {
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'generate' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Generating a customized package',
      nextDoc: 'Import packages in your stylesheets',
      previousDoc: 'Install fancy packages',
      nextDocUrl: 'use',
      previousDocUrl: 'install'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = ''}
  }

}
