import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { RDXAppState, select, Observable, Subscription } from '../store'
import { DOCUMENT } from '@angular/platform-browser'

interface IScroll {
	top:number,
	event:any
}

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective implements OnInit, OnDestroy {

	@select(['app']) private _app:Observable<RDXAppState>

	private _subApp:Subscription
	private _scroll:IScroll = { top: 0, event: null }
	private _currentScrollBeforePopup:number

  constructor(
  	private _elementRef:ElementRef,
  	private _renderer:Renderer2,
  	@Inject(DOCUMENT) private _document: any,
		@Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(){
  	this._subApp = this._app.subscribe((app:RDXAppState) => {
  		if (!app.isMainContainerScrollable) { this._currentScrollBeforePopup = this._scroll.top }
  		this._renderer.setStyle(this._elementRef.nativeElement, 'top', app.isMainContainerScrollable ? '' : -this._scroll.top + 'px')
  		this._renderer.setStyle(this._elementRef.nativeElement, 'position', app.isMainContainerScrollable ? '' : 'fixed')
  		if (app.isMainContainerScrollable) {
				if (isPlatformBrowser(this.platformId)) {
					this._document.body
					? this._document.body.scrollTo(0, this._currentScrollBeforePopup)
					: this._document.documentElement.scrollTo(0, this._currentScrollBeforePopup)
        }
  		}
  	})
  }

  ngOnDestroy(){
    if (this._subApp) { this._subApp.unsubscribe() }
  }

  @HostListener('window:scroll', ['$event']) stopscroll($event){
   	this._scroll.event = $event
		// if (isPlatformBrowser(this.platformId)) {
			this._scroll.top = $event.pageY
				|| ($event.srcElement && $event.srcElement.documentElement && $event.srcElement.documentElement.scrollTop)
				|| 0
		// }

	}
}
