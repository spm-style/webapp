import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { DOCUMENT } from '@angular/platform-browser'
import { FormBuilder, FormGroup } from '@angular/forms'
import { environment } from '../../../../../environments/environment'
import { 
  NgRedux,
  RDXRootState,
  IPackage,
  IPackageCurrent,
  IPackageOrigin,
  select,
  Observable,
  FETCH_CURRENT_PACKAGE_ORIGIN,
  CLEAR_CURRENT_PACKAGE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  IResponsiveness,
  IVariables,
  IVersions,
  CHANGE_VERSION_CURRENT_PACKAGE,
  IClasses,
  RDXUser,
  FETCH_SEO_DATA
} from '../../../../store'
import { Subscription } from 'rxjs/Subscription';
import { ApiPackageOriginService } from '../../../../service/api-package-origin.service'
import { ApiUserService } from '../../../../service/api-user.service'
import { ApiPackageService } from '../../../../service/api-package.service'
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

  @select(['packageOrigin', 'current']) readonly current:Observable<IPackageCurrent>
  @select(['user']) readonly user:Observable<RDXUser>

  private _subUrlParams:Subscription
  private _subApiGetPackage:Subscription
  private _subUser:Subscription
  private _subChangeVersion:Subscription

  private _currentDivice:IResponsiveness
  private _currentOriantation:string = 'portrait'
  private _overviewUniqueWidth:number
  private _originDomaine:string
  private _id:string
  private _versionDownload:IPackageCurrent[] = []

  public classes:ICLassModule[] = []
  public variables:IVariables[] = []
  public isFavorite:boolean = false
  public formVersion:FormGroup

  constructor(
    @Inject(DOCUMENT) private _document:any,
    @Inject(PLATFORM_ID) private _platformId:any,
    private _route: ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _apiPackageOrigin:ApiPackageOriginService,
    private _apiUser:ApiUserService,
    private _renderer:Renderer2,
    private _formBuilder:FormBuilder,
    private _apiPackage:ApiPackageService
  ){}

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this._originDomaine = this._document.domain
      this._document.domain ='spm-style.com'
    }
    let current:IPackageCurrent = this._redux.getState().packageOrigin.current
    if(!current){
      this._subUrlParams = this._route.params
      .subscribe(params => {
        this._subApiGetPackage = this._apiPackageOrigin.packageOrigin(params['name'])
        .subscribe(
          (response:IPackageOrigin) => {
            this._id = response._id
            this._redux.dispatch({ type: FETCH_CURRENT_PACKAGE_ORIGIN, packageOrigin: response })
            this._initDetailModule(response.distTags.latest.cdn, response.distTags.latest.responsiveness, response.distTags.latest.classes)
            this._redux.dispatch({type: FETCH_SEO_DATA, pageName: 'packageDetail',
              opts: {
                title: `${response.name} - spm, build up your design`,
                keywords: `${response.distTags.latest.category}, ${response.distTags.latest.keywords.join(', ')}, package, detail, ${response.distTags.latest.responsiveness.map(a => a.name).join(', ')}, responsive, sandbox, test, design, prototype, spm`,
                description: `${response.distTags.latest.category} ${response.name} detail for spm, style package manager and registry`,
                canonical: `${environment.wwwUrl}/packages/${response.name}`,
                shortTitle: `${response.name} - spm`,
                image: `${environment.cdnUrl}/overview/preview/${response.preview}`,
                twitterCard: 'summary_large_card'
              }
            })
            this._updateViewsCount(response.name)
          },
          (error:any) => { console.log('error') }
        )
      })
    }else{
      this._id = current._id
      this._initDetailModule(current.cdn, current.responsiveness, current.classes)
      console.log(current.responsiveness)
      this._redux.dispatch({type: FETCH_SEO_DATA, pageName: 'packageDetail',
        opts: {
          title: `${current.name} - spm, build up your design`,
          keywords: `${current.category}, ${current.keywords.join(', ')}, package, detail, ${current.responsiveness.map(a => a.name).join(', ')}, responsive, sandbox, test, design, prototype, spm`,
          description: `${current.category} ${current.name} detail for spm, style package manager and registry`,
          canonical: `${environment.wwwUrl}/packages/${current.name}`,
          shortTitle: `${current.name} - spm`,
          image: `${environment.cdnUrl}/overview/preview/${current.preview}`,
          twitterCard: 'summary_large_card'
        }
      })
      this._updateViewsCount(current.name)
    }

    this.formVersion = this._formBuilder.group({ version:['', []] })

    this._subChangeVersion = this.formVersion.get('version').valueChanges.subscribe((newVersion:string) => {
      let res:IPackageCurrent = this._versionDownload.filter((packageCurrent:IPackageCurrent) => packageCurrent.version == newVersion)[0]
      if(res){ 
        this._redux.dispatch({ type: CHANGE_VERSION_CURRENT_PACKAGE, packageNewVersion: res })
        this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'packageDetail',
          opts: {
            keywords: `${res.category}, ${res.keywords.join(', ')}, package, detail, ${res.responsiveness.join(', ')}, responsive, sandbox, test, design, prototype, spm`,
            description: `${res.category} ${res.name} detail for spm, style package manager and registry`
          }
        })
        this._initDetailModule(res.cdn, res.responsiveness, res.classes)
      }else{
        this._versionDownload.push(this._redux.getState().packageOrigin.current)
        for(let version of this._versionDownload[0].versions){
          if(version.name == newVersion){
            this._apiPackage.changeVersionInCurrentPackage(version.package)
            .subscribe((response:any) => {
              this._redux.dispatch({ type: CHANGE_VERSION_CURRENT_PACKAGE, packageNewVersion: response })
              this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'packageDetail',
                opts: {
                  keywords: `${response.category}, ${response.keywords.join(', ')}, package, detail, ${response.responsiveness.join(', ')}, responsive, sandbox, test, design, prototype, spm`,
                  description: `${response.category} ${response.name} detail for spm, style package manager and registry`
                }
              }) //à remplacer avec la correction des types
              this._initDetailModule(response.cdn, response.responsiveness, response.classes)
            })
          } 
        }
      }
    })
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this._platformId)) { this._document.domain = this._originDomaine }
    // this._document.domain = this._originDomaine
    if (this._subApiGetPackage) { this._subApiGetPackage.unsubscribe() }
    if (this._subUrlParams) { this._subUrlParams.unsubscribe() }
    if (this._subUser) { this._subUser.unsubscribe() }
    if (this._subChangeVersion) { this._subChangeVersion.unsubscribe()}
    this._redux.dispatch({ type: CLEAR_CURRENT_PACKAGE })
  }

    private _initDetailModule(cdn:string, responsiveness:IResponsiveness[], classes:IClasses[]):void {
    this._iframe.nativeElement.src = `${environment.cdnUrl}/overview/dom/${cdn}`
    this._overviewUniqueWidth = this._overviewUnique.nativeElement.clientWidth - 20
    this._currentOriantation = 'portrait'
    this.changeDevice(responsiveness[0])
    this.classes = []
    this.variables = []
    for(let classModule of classes){
      this.classes.push({
        name: classModule.name,
        isUse: true,
        elements: []
      })
      for(let variable of classModule.variables){ this.variables.push(variable) }
    }
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

  private _updateViewsCount(packageOriginName:string):void{
    this._apiPackageOrigin.incrementView(packageOriginName).subscribe(
      (res:any) => {  },
      (err:any) => {  }
    )
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
