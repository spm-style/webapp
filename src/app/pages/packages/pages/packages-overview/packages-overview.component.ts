import {
  Component, OnInit, ChangeDetectionStrategy,
  OnDestroy, ViewChild, ElementRef,
  Renderer2, HostListener, Inject, PLATFORM_ID, AfterViewChecked }                                from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subscription }                                                         from 'rxjs/Subscription'
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
                                                                                // Service
import { ApiPackageOriginService }                                              from './../../../../service/api-package-origin.service'
                                                                                // Redux
import {
  NgRedux, RDXRootState, FETCH_PACKAGE_ORIGIN, CHANGE_SEARCH_PATTERN, select, Observable, IPackageOrigin, RDXPackageOrigin, FETCH_SEO_DATA } from '../../../../store'
                                                                                // Api spm
import { PinterestGrid }                                                        from '../../class/pinterest-grid'

@Component({
  templateUrl: './packages-overview.component.html',
  styleUrls: ['./packages-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesOverviewComponent implements OnInit, OnDestroy {

  @ViewChild('contentList') contentList:ElementRef;

  @HostListener('window:resize', ['$event']) onResize(event) { this._pinterestGrid.init() }

  @select(['packageOrigin', 'list']) readonly list:Observable<IPackageOrigin>
  @select(['packageOrigin']) private _packageOrigin:Observable<RDXPackageOrigin>
  @select(['app', 'searchPattern']) private _searchPattern:Observable<string>

  private _subscriptionApi:Subscription
  private _subSearchPattern:Subscription
  private _subActivatedRoute:Subscription
  private _pinterestGrid:PinterestGrid
  private _lastPositionScroll:number = 0

  private _testDeMerde = 0
  private _testBis
  private _testBis2
  private _testBis3
  private _testBis4
  private _testBis5

  private _isFetchedCard:boolean = false
  private _isApiResponse:boolean = false

  public searchPattern:string

  constructor(
    private _apiPackageOrigin:ApiPackageOriginService,
    private _redux:NgRedux<RDXRootState>,
    private _renderer:Renderer2,
    private _router:Router,
    private _elem:ElementRef,
    private _activatedRoute:ActivatedRoute,
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(){
    
    this._subSearchPattern = this._searchPattern.subscribe((data: string) => {
      this._subscriptionApi = this._apiPackageOrigin.listPackageOrigin(data)
      .subscribe(
        (data:any) => {
          this._redux.dispatch({type: FETCH_PACKAGE_ORIGIN, list:data.packages})
          this._isFetchedCard = true
        },
        (error:any) => { console.log(error) }
      )
    })

    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'packagesOverview' })

    if (isPlatformBrowser(this.platformId)) {
      this._testBis2 = Observable.fromEvent(window, 'scroll')
      this._testBis = this._testBis2.subscribe((scroll) => {
        this._testBis3 = scroll.srcElement.documentElement.scrollTop
      })
      this._testBis4 = Observable.fromEvent(this._elem.nativeElement, 'wheel')
      .subscribe((wheel) => {
        this._lastPositionScroll = this._testBis3 || 0
      })
    }

    this._router.events.subscribe((event:Event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects == '/packages') {
          if (isPlatformBrowser(this.platformId)) {
            this._document.body
            ? this._document.body.scrollTo(0, this._lastPositionScroll)
            : this._document.documentElement.scrollTo(0, this._lastPositionScroll)
          }
        }
      }
    })
  }

  ngOnDestroy() {
    if (this._subscriptionApi) { this._subscriptionApi.unsubscribe() }
    if (this._subSearchPattern) { this._subSearchPattern.unsubscribe() }
    if (this._subActivatedRoute) { this._subActivatedRoute.unsubscribe() }
  }

  ngAfterViewChecked(){
    if (this._isFetchedCard && isPlatformBrowser(this.platformId)) {
      this._isFetchedCard = false
      this._updatePinterestGrid()
    }
  }

  private _updatePinterestGrid(){
    this._pinterestGrid = new PinterestGrid({
      delay: 300,
      gutter: 20,
      container: this.contentList,
      cards: this.contentList.nativeElement.children,
      loaded: false,
      shorterFirst: true
    }, this._renderer)
    if(this.contentList.nativeElement.children.length > 0){
      this._pinterestGrid.init()
    }
  }

  public setCurrentPackage(){

  }
}
