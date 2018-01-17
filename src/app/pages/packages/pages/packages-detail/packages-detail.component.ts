import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { NgRedux, RDXRootState, RDXUser, IPackageOrigin, select, Observable, FETCH_CURRENT_PACKAGE_ORIGIN, CLEAR_CURRENT_PACKAGE_ORIGIN, ADD_FAVORITE, REMOVE_FAVORITE, IResponsiveness, Ipackage, IClasses, IVariables, IUser }                 from '../../../../store';
import { Subscription } from 'rxjs/Subscription';

import { ApiPackageOriginService } from '../../../../service/api-package-origin.service';
import { ApiUserService } from '../../../../service/api-user.service'

import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'

interface ICLassModule {
  name:string,
  isUse:boolean,
  elements: Element[]
}

@Component({
  templateUrl: './packages-detail.component.html',
  styleUrls: ['./packages-detail.component.scss']
})
export class PackagesDetailComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') private _iframe:ElementRef;
  @ViewChild('overviewUnique') private _overviewUnique:ElementRef;
  @ViewChild('rangeScale') private _rangeScale:ElementRef;
  @ViewChild('textScale') private _textScale:ElementRef;

  @select(['packageOrigin', 'current']) readonly current:Observable<IPackageOrigin>
  @select(['user']) readonly user:Observable<IUser>

  private _subUrlParams:Subscription
  private _subApiGetPackage:Subscription
  private _subUser:Subscription

  private _currentDivice:IResponsiveness
  private _currentOriantation:string = 'portrait'
  private _overviewUniqueWidth:number
  private _originDomaine:string
  private _id:string

  public classes:ICLassModule[] = []
  public variables:IVariables[] = []
  public isFavorite:boolean = false

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _route: ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _apiPackageOrigin:ApiPackageOriginService,
    private _apiUser:ApiUserService,
    private _renderer:Renderer2
  ) { }

  ngOnInit() {
    this._originDomaine = this._document.domain
    this._document.domain ='spm-style.com'

    let current = this._redux.getState().packageOrigin.current

    if(!current){
      this._subUrlParams = this._route.params
      .subscribe(params => {
        this._subApiGetPackage = this._apiPackageOrigin.packageOrigin(params['name'])
        .subscribe(
          (response:IPackageOrigin) => {
            this._id = response._id
            this._redux.dispatch({ type: FETCH_CURRENT_PACKAGE_ORIGIN, current: response })
            this._initDetailModule(response)
          }
        )
      })
    }else{
      this._initDetailModule(current)
      this._id = current._id
    }
  }

  ngOnDestroy() {
    this._document.domain = this._originDomaine
    if (this._subApiGetPackage) { this._subApiGetPackage.unsubscribe() }
    if (this._subUrlParams) { this._subUrlParams.unsubscribe() }
    if (this._subUser) { this._subUser.unsubscribe() }
    this._redux.dispatch({ type: CLEAR_CURRENT_PACKAGE_ORIGIN })
  }

  public changeDevice(device:IResponsiveness):void {
    this._currentDivice = device
    this._setDeviceProperty(device, this._currentOriantation)
  }

  public changeOriantation():void {
    this._currentOriantation = this._currentOriantation == 'portrait' ? 'paysage' : 'portrait'
    this._setDeviceProperty(this._currentDivice, this._currentOriantation)
  }

  public changeScaleIframe(scale:string):void {
    if(scale.includes('%')){ scale = scale.slice(0, -1) }
    let tmpScale:number = parseFloat(scale)
    if(tmpScale > 1){ tmpScale = tmpScale / 100 }
    this._setDeviceProperty(this._currentDivice, this._currentOriantation, tmpScale)
  }

  public toggleClass(classModule:ICLassModule):void {
    if(classModule.elements.length == 0){ classModule.elements = this._iframe.nativeElement.contentWindow.document.querySelectorAll(`.${classModule.name}`) }
    for(let element of classModule.elements){
      classModule.isUse ? this._renderer.removeClass(element, classModule.name) : this._renderer.addClass(element, classModule.name)
    }
    classModule.isUse = !classModule.isUse
  }

  public isClassActive(classModule:ICLassModule):boolean{ return classModule.isUse }


  public changeVariableValue(variable:IVariables, newValue:string):void {
    this._iframe.nativeElement.contentWindow.document.documentElement.style.setProperty(`--${variable.name}`, newValue)
    variable.value = newValue
  }

  private _initDetailModule(data:IPackageOrigin):void {
    this._iframe.nativeElement.src = `http://cdn.spm-style.com/overview/dom/${data.distTags.latest.cdn}`
    this._overviewUniqueWidth = this._overviewUnique.nativeElement.clientWidth - 20
    this._currentOriantation = 'portrait'
    this.changeDevice(data.distTags.latest.responsiveness[0])
    this._createArrayClassesAndVariables(data.distTags.latest)
  }

  private _setDeviceProperty(device:IResponsiveness, oriantation:string, scale:number = null):void{
    if(!scale){ scale = this._overviewUniqueWidth / (oriantation == 'portrait' ? device.w : device.h) < 1 ? this._overviewUniqueWidth / (oriantation == 'portrait' ? device.w : device.h) : 1 }
    this._renderer.setStyle(this._overviewUnique.nativeElement.children[0], 'width', `${ (oriantation == 'portrait' ? device.w : device.h) * scale }px`)
    this._renderer.setStyle(this._overviewUnique.nativeElement.children[0], 'height', `${ (oriantation == 'portrait' ? device.h : device.w) * scale }px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'transform', `scale(${scale})`)
    this._renderer.setStyle(this._iframe.nativeElement, 'width', `${ oriantation == 'portrait' ? device.w : device.h }px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'height', `${ oriantation == 'portrait' ? device.h : device.w }px`)
    this._rangeScale.nativeElement.value = scale
    this._textScale.nativeElement.value = `${scale * 100}%`;
  }

  private _createArrayClassesAndVariables(data:Ipackage):void {
    for(let classModule of data.classes){
      this.classes.push({
        name: classModule.name,
        isUse: true,
        elements: []
      })
      for(let variable of classModule.variables){ this.variables.push(variable) }
    }
  }

  public toggleFavorite() {
    let action = this._redux.getState().user.favorites.includes(this._id) ? 'remove' : 'add'
    this._subUser = this._apiUser.favorites(this._id, action)
      .subscribe((data:boolean) => {
        if (data) {
          if (action === 'remove')
            this._redux.dispatch({ type: REMOVE_FAVORITE, favorite: this._id })
          else
            this._redux.dispatch({ type: ADD_FAVORITE, favorite: this._id })
        }
        this._subUser.unsubscribe()
      })
  }
}
