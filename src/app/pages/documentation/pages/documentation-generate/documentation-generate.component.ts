import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { NgRedux, RDXRootState, CHANGE_CURRENT_DOC, FETCH_SEO_DATA } from '../../../../store'
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
    this._redux.dispatch({type: FETCH_SEO_DATA, pageName: 'docGenerate' })
    this._redux.dispatch({
      type: CHANGE_CURRENT_DOC,
      currentDoc: 'Generating a customized package',
      nextDoc: 'Publish your creation',
      previousDoc: 'Install fancy packages',
      nextDocUrl: 'publish',
      previousDocUrl: 'install'
    })
    if (isPlatformBrowser(this.platformId)) { window.location.hash = 'title' }
  }

  ngOnDestroy(){
    if (isPlatformBrowser(this.platformId)) { window.location.hash = ''}
  }

}
