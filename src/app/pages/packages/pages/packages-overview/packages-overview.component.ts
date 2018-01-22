import {
  Component, OnInit, ChangeDetectionStrategy,
  OnDestroy, ViewChild, AfterViewInit, ElementRef,
  Renderer2, HostListener, Inject }                                                     from '@angular/core';
import { Subscription }                                                         from 'rxjs/Subscription';
import { Router, NavigationEnd, Event } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
                                                                                // Service
import { ApiPackageOriginService }                                              from '../../../../service/api-package-origin.service';
                                                                                // Redux
import {
  NgRedux, RDXRootState, FETCH_PACKAGE_ORIGIN, select, Observable, IPackageOrigin, RDXPackageOrigin, CHANGE_TAB_TITLE } from '../../../../store';
                                                                                // Api spm
import { PinterestGrid }                                                        from '../../class/pinterest-grid'

@Component({
  templateUrl: './packages-overview.component.html',
  styleUrls: ['./packages-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesOverviewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('contentList') contentList:ElementRef;

  // @ViewChild('test') test:ElementRef;

  @HostListener('window:resize', ['$event']) onResize(event) { this._pinterestGrid.init() }
  // @HostListener('window:scroll', ['$event']) onScroll(event) {
  //   // this._lastPositionScroll = event.srcElement.documentElement.scrollTop
  //   console.log('test2', event.srcElement.documentElement.scrollTop)
  //   console.log(event)
  //   // event = event || window.event
  //   // let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0
  // }

  @select(['packageOrigin', 'list']) readonly list:Observable<IPackageOrigin>
  @select(['packageOrigin']) private _packageOrigin:Observable<RDXPackageOrigin>

  private _subscriptionApi:Subscription
  private _pinterestGrid:PinterestGrid
  private _lastPositionScroll:number = 0

  private _testDeMerde = 0
  private _testBis
  private _testBis2
  private _testBis3
  private _testBis4
  private _testBis5


  constructor(
    private _apiPackageOrigin:ApiPackageOriginService,
    private _redux:NgRedux<RDXRootState>,
    private _renderer:Renderer2,
    private _router:Router,
    private _elem:ElementRef,
    @Inject(DOCUMENT) private _document: any
  ) { }

  ngOnInit(){
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'packages' })
    if(this._redux.getState().packageOrigin.list.length == 0){
      this._subscriptionApi = this._apiPackageOrigin.listPackageOrigin()
      .subscribe(
        (data:any) => { this._redux.dispatch({type: FETCH_PACKAGE_ORIGIN, list:data.packages}) },
        (error:any) => { console.log(error) }
      )
    }

    setTimeout(() => {
      this._pinterestGrid = new PinterestGrid({
        delay: 300,
        gutter: 20,
        container: this.contentList,
        cards: this.contentList.nativeElement.children,
        loaded: false,
        shorterFirst: true
      }, this._renderer)

      if(this.contentList.nativeElement.children.length > 0){ this._pinterestGrid.init() }
    }, 300)

    // this._testBis2 = merde2.subscribe((wheel) => {
      // console.log(wheel)

    // })
    this._testBis2 = Observable.fromEvent(window, 'scroll')

    this._testBis = this._testBis2.subscribe((scroll) => {
      this._testBis3 = scroll.srcElement.documentElement.scrollTop
    })

    this._testBis4 = Observable.fromEvent(this._elem.nativeElement, 'wheel')
    .subscribe((wheel) => {
      this._lastPositionScroll = this._testBis3 || 0
    })


    // this._packageOrigin.subscribe((packageOrigin:RDXPackageOrigin) => {
    //   if(!packageOrigin.current){
    //     console.log(this._lastPositionScroll)
    //     this._lastPositionScroll = this._testBis3 || 0
    //     // this._testBis = this._testBis2.subscribe((scroll) => console.log(scroll))
    //     // this._testBis = Observable.fromEvent(window, 'scroll').subscribe((scroll) => console.log(scroll))
    //     console.log('in list')
    //   }else{
    //     // this._testBis.unsubscribe()
    //     console.log('out list')
    //   }
    // })


//     export interface ScrollRegisterConfig {
//   container: ContainerRef;
//   throttleType: string;
//   throttleDuration: number;
//   filterBefore: Function;
//   mergeMap: Function;
//   scrollHandler: Function;
// }
//
// @Injectable()
// export class ScrollRegister {
//   attachEvent (options: ScrollRegisterConfig): Subscription {
//     const scroller$: Subscription = Observable.fromEvent(options.container, 'scroll')
//       [options.throttleType](() => Observable.timer(options.throttleDuration))
//       .filter(options.filterBefore)
//       .mergeMap((ev: any) => Observable.of(options.mergeMap(ev)))
//       .subscribe(options.scrollHandler);
//     return scroller$;
//   }
// }



    // let merde = Observable.fromEvent(window, 'scroll')
    // let merde2 = Observable.fromEvent(this._elem.nativeElement, 'wheel')
    // // .do((scroll) => console.log('merde'))
    // // .subscribe((scroll) => console.log(scroll))
    //





    // this._renderer.listen(this._elem.nativeElement, "wheel", (event) => {
    //   // console.log(event)
    //   // console.log('test1', event.pageY, event.layerY, event.pageY - event.layerY)
    //   this._testBis = merde.subscribe((scroll) => console.log(scroll))
    // })

    // console.log('merde1', this._router)
    this._router.events.subscribe((event:Event) => {
      // console.log('merde2', event)
      if (event instanceof NavigationEnd) {
        // console.log(this._lastPositionScroll)
        if (event.urlAfterRedirects == '/packages') {
          // console.log(this._lastPositionScroll)
          this._document.body.scrollTo(0, this._lastPositionScroll) || this._document.documentElement.scrollTo(0, this._lastPositionScroll)
        }
        else {
          // console.log('out')
          // this._testBis.unsubscribe()
          // this._testBis2.unsubscribe()
        }
        // console.log('merde3')
        // console.log(event)
        // console.log(this._testDeMerde)
        // console.log(event, event.urlAfterRedirects == '/packages')
      }
    })




    // console.log(this._testDeMerde)
  }

  ngOnDestroy() {
    if(this._subscriptionApi){ this._subscriptionApi.unsubscribe() }
  }

  ngAfterViewInit(){
    // console.log('test ngAfterViewInit')
    // setTimeout(() => {
    //   this._pinterestGrid = new PinterestGrid({
    //     delay: 300,
    //     gutter: 20,
    //     container: this.contentList,
    //     cards: this.contentList.nativeElement.children,
    //     loaded: false,
    //     shorterFirst: true
    //   }, this._renderer)
    //
    //   if(this.contentList.nativeElement.children.length > 0){ this._pinterestGrid.init() }
    // }, 200)
  }

  public updatePositionLastCardClicked(){
    // console.log('test')
    // console.log(this.contentList)
    // this._testDeMerde = 2000
    // console.log(this._lastPositionScroll)
    // this._testBis.unsubscribe()
  }
}
