import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input, Inject } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { NgRedux, RDXRootState, CHANGE_MENU_NAVIGATION, BACK_MENU_NAVIGATION, CLOSE_MENU, OPEN_MENU, select, Observable, RDXNavigationState, dispatch } from '../../store';
import { DOCUMENT } from '@angular/platform-browser';
import { Location } from '@angular/common';

interface IBackToPath {
  url:string,
  dist:string
}

@Component({
  selector: 'spm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @select(['navigation']) readonly navigation: Observable<RDXNavigationState>

  @ViewChild('buttonBackTo') private _backto:ElementRef

  private _backToPath:IBackToPath[] = [
    { url: '/packages/', dist: '/packages' },
    { url: '/documentation/', dist: '/documentation' }
  ]

  public backToCurrent:string

  constructor(
    private _router: Router,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _location: Location,
    private _redux:NgRedux<RDXRootState>,
    @Inject(DOCUMENT) private _document: any
  ){}

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        if (!event.url.includes('#')) { this._document.body.scrollTo(0, 0) || this._document.documentElement.scrollTo(0, 0) }
        this._redux.dispatch({ type: CLOSE_MENU })
        this._renderer.removeClass(this._backto.nativeElement, 'back-to-active')
        for(let path of this._backToPath){
          if(event.url.indexOf(path.url) != -1){
            this.backToCurrent = path.dist
            this._renderer.addClass(this._backto.nativeElement, 'back-to-active')
          }
        }
      }
    });
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
}
