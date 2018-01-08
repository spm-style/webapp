import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

import { NgRedux, RDXRootState, IPackageOrigin, select, Observable, FETCH_CURRENT_PACKAGE_ORIGIN, CLEAR_CURRENT_PACKAGE_ORIGIN, IResponsiveness }                 from '../../../../store';
import { Subscription } from 'rxjs/Subscription';

import { ApiPackageOriginService } from '../../../../service/api-package-origin.service';

import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/observable/of';

interface ICLassModule {
  name:string,
  isUse:boolean,
  elements: [Element]
}

interface IVariableModule {
  name:string,
  value:string
}


@Component({
  templateUrl: './packages-detail.component.html',
  styleUrls: ['./packages-detail.component.scss']
})
export class PackagesDetailComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') private _iframe:ElementRef;
  @ViewChild('overviewUnique') private _overviewUnique:ElementRef;
  @ViewChild('rangeScale') private _rangeScale:ElementRef;

  @select(['packageOrigin', 'current']) readonly current:IPackageOrigin

  private _subsrciptionUrlParams:Subscription
  private _subsrciptionApiGetPackage:Subscription

  private _currentDivice:IResponsiveness
  private _currentOriantation:string = 'portrait'
  private _overviewUniqueWidth:number
  private _classes:[ICLassModule]
  private _variables:[ICLassModule]

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _route: ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _apiPackageOrigin:ApiPackageOriginService,
    private _renderer:Renderer2,
    private _location: Location,
  ) { }

  ngOnInit() {
    if(!this._redux.getState().packageOrigin.current){
      this._subsrciptionUrlParams = this._route.params
      .subscribe(params => {
        this._subsrciptionApiGetPackage = this._apiPackageOrigin.packageOrigin(params['name'])
        .subscribe(
          (response:IPackageOrigin) => {
            this._redux.dispatch({ type: FETCH_CURRENT_PACKAGE_ORIGIN, current: response })
            this._iframe.nativeElement.src = `http://cdn.spm-style.com/overview/dom/${response.distTags.latest.cdn}`
            this._overviewUniqueWidth = this._overviewUnique.nativeElement.clientWidth - 20
            this._currentOriantation = 'portrait'
            this.changeDevice(response.distTags.latest.responsiveness[0])
          }
        )
      })
    }
  }

  ngOnDestroy() {
    this._subsrciptionUrlParams.unsubscribe();
    this._subsrciptionApiGetPackage.unsubscribe();
    this._redux.dispatch({ type: CLEAR_CURRENT_PACKAGE_ORIGIN })
  }

  public backTo(){
    this._location.back()
  }

  public changeDevice(device:IResponsiveness){
    this._currentDivice = device
    this._setDeviceProperty(device, this._currentOriantation)
  }

  public changeOriantation(){
    this._currentOriantation = this._currentOriantation == 'portrait' ? 'paysage' : 'portrait'
    this._setDeviceProperty(this._currentDivice, this._currentOriantation)
  }

  public test(){
    this._document.domain='spm-style.com'
    console.log('merde', this._iframe.nativeElement.contentWindow.style.setProperty('--herve_toggle-radius', `0px`))
    // this._iframe.nativeElement.documentElement.style.setProperty('--herve_toggle-radius', `0px`);
  }

  private _setDeviceProperty(device:IResponsiveness, oriantation:string):void{
    let scale = this._overviewUniqueWidth / (oriantation == 'portrait' ? device.w : device.h) < 1 ? this._overviewUniqueWidth / (oriantation == 'portrait' ? device.w : device.h) : 1
    this._renderer.setStyle(this._overviewUnique.nativeElement.children[0], 'width', `${ (oriantation == 'portrait' ? device.w : device.h) * scale }px`)
    this._renderer.setStyle(this._overviewUnique.nativeElement.children[0], 'height', `${ (oriantation == 'portrait' ? device.h : device.w) * scale }px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'transform', `scale(${scale})`)
    this._renderer.setStyle(this._iframe.nativeElement, 'width', `${ oriantation == 'portrait' ? device.w : device.h }px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'height', `${ oriantation == 'portrait' ? device.h : device.w }px`)
    this._rangeScale.nativeElement.value = scale;
  }

  private _createArrayClassesAndVariables():void{
    // private _classes:[ICLassModule]
    // private _variables:[ICLassModule]

    // this.current.distTags.latest.classes
  }


}
