import { Component, OnInit, Inject, Renderer2, ElementRef, PLATFORM_ID } from '@angular/core';
import { NgRedux, RDXRootState, FETCH_USER, LOGOUT_USER, RDXSeoState } from './store'
import { ApiUserService, IUserResponse } from './service/api-user.service'
import { LocalstorageService, USER_ID, USER_TOKEN_CONNECTION } from './service/localstorage.service'
import { Title, Meta, DOCUMENT  } from '@angular/platform-browser'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'spm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _canonical:ElementRef

  constructor(
    private _apiUser:ApiUserService,
    private _redux:NgRedux<RDXRootState>,
    private _localStorageService:LocalstorageService,
    private _titleService:Title,
    private _metaService:Meta,
    @Inject(DOCUMENT) private _document,
    @Inject(PLATFORM_ID) private _platformId,
    private _renderer:Renderer2
  ){}

  ngOnInit(){
      this._canonical = this._document.querySelector('link[rel=canonical]')
      this._redux.select(['seo'])
      .subscribe((data:RDXSeoState) => {
        this._titleService.setTitle(data.title)
        this._metaService.updateTag({name: 'description', content: data.description })
        this._metaService.updateTag({name: 'keywords', content: data.keywords })
        this._metaService.updateTag({property: 'og:title', content: data.shortTitle })
        this._metaService.updateTag({property: 'og:description', content: data.description })
        this._metaService.updateTag({property: 'og:image', content: data.image })
        this._metaService.updateTag({property: 'og:url', content: data.canonical })
        this._metaService.updateTag({property: 'og:site_name', content: 'spm - Style Package Manager'})
        this._metaService.updateTag({name: 'twitter:card', content: data.twitterCard })
        this._metaService.updateTag({name: 'twitter:image:alt', content: data.shortTitle })
        this._renderer.setAttribute(this._canonical, 'href', data.canonical)
      })
    if(this._localStorageService.isLogged()){
      this._apiUser.getUserById()
      .subscribe((response:IUserResponse) => {
        this._redux.dispatch({ type: FETCH_USER, user: response })
      }, (error:any) => {
        this._localStorageService.logout()
        this._redux.dispatch({ type: LOGOUT_USER })
      })
    } else {
      this._localStorageService.logout()
        this._redux.dispatch({ type: LOGOUT_USER })
    }
  }
}
