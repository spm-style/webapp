import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input, Inject, OnDestroy, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router'
import { NgRedux, RDXRootState, RDXUser, CHANGE_MENU_NAVIGATION, BACK_MENU_NAVIGATION, CHANGE_SEARCH_PATTERN, CLOSE_MENU, OPEN_MENU, UPDATE_MENU_NAVIGATION, LOGOUT_USER, CHANGE_BACK_TO_CURRENT, select, Observable, RDXNavigationState, dispatch } from '../../store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { PopupService } from '../../modules/popup/popup.service'
import { ApiUserService } from '../../service/api-user.service'
import { LocalstorageService } from '../../service/localstorage.service'
import { Subscription } from 'rxjs/Subscription'

import { environment } from '../../../environments/environment'

interface IBackToPath {
  url:string,
  dist:string
}

@Component({
  selector: 'spm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  @select(['navigation']) readonly navigation: Observable<RDXNavigationState>
  @select(['user']) readonly user:Observable<RDXUser>
  @select(['app', 'backToCurrent']) public backToCurrent:Observable<string>
  @select(['app', 'searchPattern']) private _searchPattern:Observable<string>

  @ViewChild('buttonBackTo') private _backto:ElementRef

  private _backToPath:IBackToPath[] = [
    { url: '/modules/', dist: '/modules' },
    { url: '/documentation/', dist: '/documentation' },
    { url: '/profile/modules/', dist: '/profile/modules'}
  ]

  private _navigationSubMenu:string[] = ['documentation', 'profile']
  private _subPopup:Subscription
  private _subLogout:Subscription
  private _subPackageSearch:Subscription
  private _subSearchBar:Subscription

  public formSearchModules:FormGroup
  public searchPattern:string = ''
  public previousPage:string
  public isLogged:boolean

  constructor(
    private _router: Router,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _location: Location,
    private _redux:NgRedux<RDXRootState>,
    private _popupService:PopupService,
    private _apiUserService:ApiUserService,
    private _localStorageService:LocalstorageService,
    private _formBuilder:FormBuilder,
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private platformId: any
  ){}

  ngOnInit() {

    this.formSearchModules = this._formBuilder.group({
      search: ['', []]
    })

    this._subSearchBar = this._router.events.filter(e => e instanceof NavigationEnd).subscribe(() => {
      if (this._router.url.startsWith('/modules?search=')) {
        this.formSearchModules.setValue({ search: this._router.url.substring('/modules?search='.length) })
      } else if (this.formSearchModules.value.search != '') {
        this.searchPattern = ''
        this.formSearchModules.setValue({ search: '' })
      }
    })

    this._subPackageSearch = this.formSearchModules.get('search').valueChanges
    .debounceTime(300)
    .subscribe((pattern:string) => {
      this._redux.dispatch({ type: CHANGE_SEARCH_PATTERN, searchPattern: pattern })
      if (pattern != '') {
        if (this.searchPattern == '') { this.previousPage = this._router.url.startsWith('/modules') ? '/modules' : this._router.url }
        this._router.navigate(['modules'],  { queryParams: { search: pattern } })
      } else if (this.searchPattern != '' && this.previousPage) {
        this._router.navigate([this.previousPage])
      } else if (!this.previousPage) {
        this._router.navigate(['modules'])
      }
      this.searchPattern = pattern
    })

    this._router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        if (!event.url.includes('#')) {
          if (isPlatformBrowser(this.platformId)) {
            this._renderer.setAttribute(this._document.querySelector('link[rel=canonical]'), 'href', environment.wwwUrl)

            this._document.body.scrollTo
            ? this._document.body.scrollTo(0, 0)
            : this._document.documentElement.scrollTo(0, 0)
            this._redux.dispatch({ type: CLOSE_MENU })
            this._renderer.removeClass(this._backto.nativeElement, 'back-to-active')
          }
        }
      } else if (event instanceof NavigationEnd) {
        for(let path of this._backToPath){
          if(event.urlAfterRedirects.startsWith(path.url)){
            if (isPlatformBrowser(this.platformId)) {
              this._redux.dispatch({ type: CHANGE_BACK_TO_CURRENT, backToCurrent: path.dist })
              this._renderer.addClass(this._backto.nativeElement, 'back-to-active')
            }
          }
        }
        let splitUrl = event.urlAfterRedirects.split('/')
        let reduxObj = { type: UPDATE_MENU_NAVIGATION, currentActiveMenu: 'root', currentMenuBelow: '' }
        for (let i = splitUrl.length - 1; i >= 0; i--) {
          if (this._navigationSubMenu.includes(splitUrl[i])) {
            Object.assign(reduxObj, { currentActiveMenu: splitUrl[i], currentMenuBelow: i > 1 ? splitUrl[i - 1] : 'root' })
            break
          }
        }
        this._redux.dispatch(reduxObj)
      }
    });
  }

  ngOnDestroy(){
    if (this._subPopup) { this._subPopup.unsubscribe() }
    if (this._subLogout) { this._subLogout.unsubscribe() }
    if (this._subPackageSearch) { this._subPackageSearch.unsubscribe() }
    if (this._subSearchBar) { this._subSearchBar.unsubscribe() }
  }

  @dispatch() public openSubMenu(nameSubMenu:string):any { return { type: CHANGE_MENU_NAVIGATION, currentActiveMenu: nameSubMenu } }
  @dispatch() public closeMenu():any { return { type: CLOSE_MENU } }
  @dispatch() public openMenu():any { return { type: OPEN_MENU } }
  @dispatch() public backSubMenu(nameParentMenu:string = ''):any { return { type: BACK_MENU_NAVIGATION, nameParentMenu } }

  public stopPropagation(event) { event.stopPropagation() }

  public bindingClassMenu(expandedName:string):any {
    let objClass = {active: null, below: null}
    this.navigation.subscribe((navigation:RDXNavigationState) => {
      objClass.active = navigation.currentActiveMenu == expandedName
      objClass.below = navigation.currentMenuBelow == expandedName
    })
    return objClass
  }

  public logout(){
  this._subPopup = this._popupService.confirmation(
    'log out',
    'Login out from spm',
    'Are you sure you want to log out from spm ?',
    '',
     '',
    false).subscribe((data) => {
      if (data) {
        this._subLogout = this._apiUserService.logout()
        .subscribe((data:any) => {
          this._localStorageService.logout()
          this._subLogout.unsubscribe()
          this._redux.dispatch({ type: LOGOUT_USER })
          this._router.navigate([''])
        }, (error:any) => {
          this._localStorageService.logout()
          this._subLogout.unsubscribe()
          this._redux.dispatch({ type: LOGOUT_USER })
          this._router.navigate([''])
        })
      }
      this._subPopup.unsubscribe()
    })
  }
}
