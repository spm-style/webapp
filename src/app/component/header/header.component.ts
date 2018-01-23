import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input, Inject, OnDestroy } from '@angular/core'
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router'
import { NgRedux, RDXRootState, RDXUser, CHANGE_MENU_NAVIGATION, BACK_MENU_NAVIGATION, CLOSE_MENU, OPEN_MENU, UPDATE_MENU_NAVIGATION, LOGOUT_USER, select, Observable, RDXNavigationState, dispatch } from '../../store';
import { DOCUMENT } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { PopupService } from '../../modules/popup/popup.service'
import { ApiUserService } from '../../service/api-user.service'
import { LocalstorageService } from '../../service/localstorage.service'
import { Subscription } from 'rxjs/Subscription'

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

  @ViewChild('buttonBackTo') private _backto:ElementRef

  private _backToPath:IBackToPath[] = [
    { url: '/packages/', dist: '/packages' },
    { url: '/documentation/', dist: '/documentation' },
    { url: '/profile/packages/', dist: '/profile/packages'}
  ]

  private _navigationSubMenu:string[] = ['documentation', 'profile']
  private _subPopup:Subscription
  private _subLogout:Subscription

  public backToCurrent:string
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
    @Inject(DOCUMENT) private _document: any
  ){}

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        if (!event.url.includes('#')) {
          this._document.body.scrollTo
          ? this._document.body.scrollTo(0, 0)
          : this._document.documentElement.scrollTo(0, 0) }
        this._redux.dispatch({ type: CLOSE_MENU })
        this._renderer.removeClass(this._backto.nativeElement, 'back-to-active')
      } else if (event instanceof NavigationEnd) {        
        for(let path of this._backToPath){
          if(event.urlAfterRedirects.startsWith(path.url)){
            this.backToCurrent = path.dist
            this._renderer.addClass(this._backto.nativeElement, 'back-to-active')
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
    if (this._subPopup) {
      this._subPopup.unsubscribe()
    }
    if (this._subLogout) {
      this._subLogout.unsubscribe()
    }
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
