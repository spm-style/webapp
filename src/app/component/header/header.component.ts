import { Component, OnInit, ElementRef, Renderer2, Input, Inject } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { NgRedux, RDXRootState, CHANGE_MENU_NAVIGATION, BACK_MENU_NAVIGATION, CLOSE_MENU, OPEN_MENU, select, Observable, RDXNavigationState } from '../../store';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'spm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @select(['navigation']) readonly navigation: Observable<RDXNavigationState>

  constructor(private _router: Router,
              private _elementRef: ElementRef,
              private _renderer: Renderer2,
              private _redux:NgRedux<RDXRootState>,
              @Inject(DOCUMENT) private _document: any) {

    _renderer.listen(_elementRef.nativeElement, 'click', (event) => {
      if (event.target.classList.contains('expand')) {
        _redux.dispatch({ type: CHANGE_MENU_NAVIGATION, currentActiveMenu: event.target.id + 'ed' })
      } else if (event.target.classList.contains('expanded-control')) {
        if (this._redux.getState().navigation.currentMenuBelow) { _redux.dispatch({ type: BACK_MENU_NAVIGATION }) }
      } else if (event.target.tagName === 'NAV') {
        this._redux.dispatch({ type: CLOSE_MENU })
      }
    })
  }

  ngOnInit() {
    this._router.events.subscribe((event:Event) => {
      if (event instanceof NavigationStart) {
        if (!event.url.includes('#')) { this._document.body.scrollTo(0, 0) || this._document.documentElement.scrollTo(0, 0) }
        this._redux.dispatch({ type: CLOSE_MENU })
      }
    })
  }

  public openMenu():void {
    this._redux.dispatch({ type: OPEN_MENU })
  }
}
