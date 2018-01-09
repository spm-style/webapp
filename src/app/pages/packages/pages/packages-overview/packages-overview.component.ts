import {
  Component, OnInit, ChangeDetectionStrategy,
  OnDestroy, ViewChild, AfterViewInit, ElementRef,
  Renderer2, HostListener }                                                     from '@angular/core';
import { Subscription }                                                         from 'rxjs/Subscription';
                                                                                // Service
import { ApiPackageOriginService }                                              from '../../../../service/api-package-origin.service';
                                                                                // Redux
import {
  NgRedux, RDXRootState, FETCH_PACKAGE_ORIGIN,
  select, Observable, IPackageOrigin }                                          from '../../../../store';
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

  @select(['packageOrigin', 'list']) readonly list:Observable<IPackageOrigin>

  private _subscriptionApi:Subscription;
  private _pinterestGrid:PinterestGrid

  constructor(
    private _apiPackageOrigin:ApiPackageOriginService,
    private _redux:NgRedux<RDXRootState>,
    private _renderer:Renderer2
  ) { }

  ngOnInit(){
    if(this._redux.getState().packageOrigin.list.length == 0){
      this._subscriptionApi = this._apiPackageOrigin.listPackageOrigin()
      .subscribe(
        (data:any) => { console.log(data); this._redux.dispatch({type: FETCH_PACKAGE_ORIGIN, list:data}) },
        (error:any) => { console.log(error) }
      )
    }
    // setTimeout(() => {
    //   console.log('merde')
    //   this.test.nativeElement.scrollIntoView()
    // },3000)
  }

  ngOnDestroy() {
    if(this._subscriptionApi){ this._subscriptionApi.unsubscribe() }
  }

  ngAfterViewInit(){
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
    }, 100)
  }

  public navigateToDetail(name:string):void {
    console.log(name)
  }
}
