import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgRedux, RDXRootState, IPackageOrigin, select, Observable }                 from '../../../../store';
import { Subscription } from 'rxjs/Subscription';

import { ApiPackageOriginService } from '../../../../service/api-package-origin.service';

import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/do'

@Component({
  templateUrl: './packages-detail.component.html',
  styleUrls: ['./packages-detail.component.scss']
})
export class PackagesDetailComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') private _iframe:ElementRef;


  private _sub:Subscription
  public data:IPackageOrigin
  // private list$:Observable<any>

  // @select(['packageOrigin', 'list']) list$:Observable<IPackageOrigin>

  private _currentDivice;
  private _currentOriantation = 'portrait';
  @ViewChild('overviewUnique') private _overviewUnique:ElementRef;
  @ViewChild('rangeScale') private _rangeScale:ElementRef;

  private _overviewUniqueWidth;

  constructor(
    private _route: ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _apiPackageOrigin:ApiPackageOriginService
  ) { }

  ngOnInit() {
    this._overviewUniqueWidth = this._overviewUnique.nativeElement.clientWidth - 20;
    this._sub = this._route.params.subscribe(params => {
      let list = this._redux.getState().packageOrigin.list;
      if(list.length > 0){
        // this.list$ = Observable.from(this._redux.getState().packageOrigin.list)
        this.data = this._redux.getState().packageOrigin.list
        .filter((packageOrigin:IPackageOrigin) => packageOrigin.name == params['name'])[0]
        this._iframe.nativeElement.src = `http://cdn.spm-style.com/overview/${this.data.distTags.latest.cdn}`
        this.changeDevice(this.data.distTags.latest.responsiveness[0].name)
      }else{
        this._apiPackageOrigin.packageOrigin(params['name'])
        .subscribe(
          (data:any) => {
            console.log(data)
            this.data = data
            this._iframe.nativeElement.src = `http://cdn.spm-style.com/overview/${data.distTags.latest.cdn}`
            this.changeDevice(this.data.distTags.latest.responsiveness[0])
          }
        )
      }
   });
  }

  getOverview(){
    return 'http://cdn.spm-style.com/overview/a9d0cc00-e3d2-11e7-9d9b-8b45ab29ea8e'
  }

  public changeDevice(device:any){
    console.log('test de merde', device)
    this._currentDivice = device
    this._currentOriantation = 'portrait';
    let scale
    if(this._overviewUniqueWidth / device.w < 1){
      scale = this._overviewUniqueWidth / device.w;
    }else{
      scale = 1
    }
    document.documentElement.style.setProperty('--widthContainerOverview', `${device.w * scale}px`);
    document.documentElement.style.setProperty('--heightContainerOverview', `${device.h * scale}px`);
    document.documentElement.style.setProperty('--scale', scale);
    document.documentElement.style.setProperty('--heightOverview', `${device.h}px`);
    document.documentElement.style.setProperty('--widthOverview', `${device.w}px`);
    // document.querySelector('#range-scale').value = device.scale;
    this._rangeScale.nativeElement.value = device.scale;
  }


  public changeOriantation(){
    this._currentDivice;
    this._currentDivice.scale = this._overviewUniqueWidth / this._currentDivice.h;
    let scale
    if(this._currentDivice != 'laptop'){
      if(this._currentOriantation == 'portrait'){
        let scale
        if(this._overviewUniqueWidth / this._currentDivice.h < 1){
          scale = this._overviewUniqueWidth / this._currentDivice.h;
        }else{
          scale = 1
        }
        this._currentOriantation = 'paysage';
        document.documentElement.style.setProperty('--widthContainerOverview', `${this._currentDivice.h * scale}px`);
        document.documentElement.style.setProperty('--heightContainerOverview', `${this._currentDivice.w * scale}px`);
        document.documentElement.style.setProperty('--scale', scale);
        document.documentElement.style.setProperty('--heightOverview', `${this._currentDivice.w}px`);
        document.documentElement.style.setProperty('--widthOverview', `${this._currentDivice.h}px`);
      }else{
        if(this._overviewUniqueWidth / this._currentDivice.w < 1){
          scale = this._overviewUniqueWidth / this._currentDivice.w;
        }else{
          scale = 1
        }
        this._currentOriantation = 'portrait';
        document.documentElement.style.setProperty('--widthContainerOverview', `${this._currentDivice.w * scale}px`);
        document.documentElement.style.setProperty('--heightContainerOverview', `${this._currentDivice.h * scale}px`);
        document.documentElement.style.setProperty('--scale', scale);
        document.documentElement.style.setProperty('--heightOverview', `${this._currentDivice.h}px`);
        document.documentElement.style.setProperty('--widthOverview', `${this._currentDivice.w}px`);
      }
    }
  }


  ngOnDestroy() {
    this._sub.unsubscribe();
  }

}
